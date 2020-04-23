import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {DateRangePickerService} from '../../shared/services/date-range-picker.service';
import material from '@amcharts/amcharts4/themes/material';
import {NzModalService} from 'ng-zorro-antd';
import {FilterComponent} from '../../shared/filter/filter.component';
import {isUndefined, range, random, merge, cloneDeep} from 'lodash';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {SettingsService} from '../../shared/services/settings.service';
import {first} from 'rxjs/internal/operators/first';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TreeNodeTable} from '../../helpers/tree-node-table';
import {ComparisonComponent} from '../../shared/comparison/comparison.component';
import {tap} from 'rxjs/internal/operators/tap';
import {IReport} from '../../shared/models/report';
import {ReportService} from '../../shared/services/report.service';
import {debounceTime, shareReplay, switchMap} from 'rxjs/operators';
import {reportsFields} from '../../helpers/field-types';
import {EventComponent} from '../../shared/event/event.component';

am4core.useTheme(material);

export interface TreeNodeInterface {
  key: number;
  description: string;
  wayItAffects: string;
  startDate: string;
  endDate?: string;

  level?: number;
  expand?: boolean;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

class TaleUntilDestroy {
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends TreeNodeTable implements OnInit, AfterViewInit, OnDestroy {

  report$: Observable<IReport>;
  reports$: Observable<IReport[]>;
  widgetsData$: Observable<any[]>;
  eventsData$: Observable<any[]>;

  wayItAffects = {
    negative: 'Negativamente',
    positive: 'Positivamente'
  };

  wayItAffectsTag = {
    negative: 'error',
    positive: 'success'
  };

  selectedChartColumn: any;

  public chart: am4charts.XYChart;

  form: FormGroup;

  settingsSub: Observable<{
    report: string,
    date: [],
    fields: [],
    filter: {
      enabled: boolean,
      values: any
    },
    comparison: {
      enabled: boolean,
      values: any
    }
  }>;

  combinedSub: Subscription;

  get filterEnabled(): FormControl {
    return this.form.get('filter.enabled') as FormControl;
  }

  get comparisonEnabled(): FormControl {
    return this.form.get('comparison.enabled') as FormControl;
  }

  constructor(private zone: NgZone,
              private fb: FormBuilder,
              private settingsService: SettingsService,
              private dateRangePickerService: DateRangePickerService,
              private modalService: NzModalService,
              private reportService: ReportService) {
    super();
    this.form = this.fb.group({
      report: this.fb.control(null, [Validators.required]),
      date: this.fb.control([], [Validators.required]),
      filter: this.fb.group({
        enabled: this.fb.control(false),
        values: this.fb.control(null),
      }),
      comparison: this.fb.group({
        enabled: this.fb.control(false),
        type: this.fb.control(null),
        values: this.fb.control(null),
      })
    });
    this.reports$ = this.reportService.getAll();
  }

  ngOnInit(): void {
    this.settingsSub = this.settingsService.liveSettingsFromModule('DashboardModule');
    this.settingsSub.pipe(first()).subscribe((v) => {
      this.form.patchValue(v, {emitEvent: false});
    });

    this.report$ = this.settingsSub.pipe(
      switchMap(v => this.reportService.get(v.report)),
      shareReplay({bufferSize: 1, refCount: true})
    );

    this.widgetsData$ = this.settingsSub.pipe(
      switchMap(settings => this.reportService.getWidgetsData(settings))
    );

    this.eventsData$ = this.settingsSub.pipe(
      switchMap(settings => this.reportService.getEvents(settings)),
      tap((data) => {
        data.forEach(item => {
          this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
        });
      })
    );

    this.form.valueChanges
      .pipe(debounceTime(100))
      .subscribe((v) => {
        this.settingsService.patchItems('DashboardModule', v);
      });

    this.form.get('report').valueChanges.subscribe(
      report => {
        this.form.get('filter').patchValue({
          enabled: true,
          values: {condition: 'and', rules: []}
        });
      });
  }

// Create series
  createSeries(chart, field, name, toBack = false, colorIndex, type) {
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'index';
    series.name = name;
    series.tooltipText = '{name}\n[bold font-size: 12]${valueY}' + type + '[/]';
    // series.columns.template.tooltipText = '{name}\n[bold font-size: 20]${valueY}M[/]';
    series.sequencedInterpolation = true;
    series.strokeWidth = 0;
    series.columns.template.width = am4core.percent(95);

    if (toBack) {
      series.stacked = toBack;
      series.fill = chart.colors.getIndex(colorIndex).lighten(0.5);
      series.toBack();
    }

    series.columns.template.events.on('over', (ev) => {
      this.zone.runGuarded(() => {
        this.selectedChartColumn = this.chart.data[ev.target.dataItem.index];
      });
    }, this.chart);
  }

  ngAfterViewInit() {
    this.combinedSub = combineLatest(
      this.settingsSub,
      this.report$).pipe(
      tap((t) => {
        this.zone.runOutsideAngular(() => {
          if (this.chart) {
            this.chart.dispose();
          }
        });
      })
    ).subscribe(([settings, report]) => {
      this.reportService.getChartData(merge(
        cloneDeep(settings),
        {report: report.code},
        {fields: Object.keys(reportsFields[report.code]).map((k) => reportsFields[report.code][k])}
      )).subscribe((data) => {
        const chartName = report.description;
        this.zone.runOutsideAngular(() => {
          const chart = am4core.create('chartdiv', am4charts.XYChart);
          chart.data = data;
          const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = 'index';
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.minGridDistance = 20;
          categoryAxis.renderer.cellStartLocation = 0.1;
          categoryAxis.renderer.cellEndLocation = 0.9;

          const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.min = 0;
          valueAxis.title.text = chartName; // TODO: Nombre del chart
          this.createSeries(chart, 'current', `${chartName} Actual`, false, 0, '%');
          this.createSeries(chart, 'current_goal', `${chartName} Objetivo Actual`, true, 0, '%');
          if (settings.comparison.enabled) {
            this.createSeries(chart, 'comparison', `${chartName} vs`, false, 1, '%');
            this.createSeries(chart, 'comparison_goal', `${chartName} Objetivo vs`, true, 1, '%');
          }
// Add cursor
          chart.cursor = new am4charts.XYCursor();
// Add legend
          chart.legend = new am4charts.Legend();
          chart.legend.position = 'top';
          chart.exporting.menu = new am4core.ExportMenu();
          this.chart = chart;
        });
      });
    });

  }

  displayFilterModal() {
    const reportSub = this.report$.subscribe(
      rep => {
        const modal = this.modalService.create({
          nzTitle: 'Filtros',
          nzContent: FilterComponent,
          nzStyle: {
            width: '800px'
          },
          nzComponentParams: {
            query: this.form.get('filter.values').value,
            report: rep.code
          }
        }).afterClose.asObservable().subscribe((r) => {
          if (!isUndefined(r)) {
            this.form.get('filter.values').patchValue(r);
          }
          modal.unsubscribe();
          reportSub.unsubscribe();
        });
      });
  }

  displayComparisonModal() {
    const modal = this.modalService.create({
      nzTitle: 'Comparación',
      nzContent: ComparisonComponent,
      nzStyle: {
        width: '800px'
      },
      nzComponentParams: {
        type: this.form.get('comparison.type').value,
        values: this.form.get('comparison.values').value
      }
    }).afterClose.asObservable().subscribe((r) => {
      if (!isUndefined(r)) {
        this.form.get('comparison').patchValue(r);
      }
      modal.unsubscribe();
    });
  }

  displayEventModal() {
    const modal = this.modalService.create({
      nzTitle: 'Eventos',
      nzContent: EventComponent,
      nzStyle: {
        width: '800px'
      }
    }).afterClose.asObservable().subscribe((r) => {
      this.settingsService.refreshCurrentSettingsFromLocalStorage();
      modal.unsubscribe();
    });

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    });
    this.combinedSub.unsubscribe();
  }
}
