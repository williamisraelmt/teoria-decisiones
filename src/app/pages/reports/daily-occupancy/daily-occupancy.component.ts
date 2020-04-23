import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, combineLatest} from 'rxjs';
import {SettingsService} from '../../../shared/services/settings.service';
import {DateRangePickerService} from '../../../shared/services/date-range-picker.service';
import {NzModalService, NzTableQueryParams} from 'ng-zorro-antd';
import {first, map} from 'rxjs/operators';
import {FilterComponent} from '../../../shared/filter/filter.component';
import {ComparisonComponent} from '../../../shared/comparison/comparison.component';
import {isUndefined, merge, cloneDeep, findKey} from 'lodash';
import {ReportService} from '../../../shared/services/report.service';
import {IReport} from '../../../shared/models/report';
import {ReportTable} from '../../../helpers/report-table';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {reportsFields} from '../../../helpers/field-types';
import {ExportToCsv} from 'export-to-csv';

const REPORT_CODE = 'dailyOccupancy';

@Component({
  selector: 'app-daily-occupancy',
  templateUrl: './daily-occupancy.component.html',
  styleUrls: ['./daily-occupancy.component.scss']
})
export class DailyOccupancyComponent extends ReportTable implements OnInit, OnDestroy {

  report$: Observable<IReport>;
  reportData$: Observable<any>;

  form: FormGroup;

  settingsSub: Observable<any>;
  fieldsList: any[] = Object.keys(reportsFields[REPORT_CODE]).map((k) => reportsFields[REPORT_CODE][k]);
  fieldsAsKeys = reportsFields[REPORT_CODE];

  get stringFields() {
    return Object.keys(reportsFields[REPORT_CODE])
      .filter((k) => this.form.get('fields').value.some(v => k === v))
      .filter((k) => reportsFields[REPORT_CODE][k].type !== 'double');
  }

  get numericFields() {
    return Object.keys(reportsFields[REPORT_CODE])
      .filter((k) => this.form.get('fields').value.some(v => k === v))
      .filter((k) => reportsFields[REPORT_CODE][k].type === 'double');
  }

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
      fields: this.fb.control([], [Validators.required]),
      filter: this.fb.group({
        enabled: this.fb.control(false),
        values: this.fb.control(null),
      }),
      comparison: this.fb.group({
        enabled: this.fb.control(false),
        type: this.fb.control(null),
        values: this.fb.control(null),
      }),
      tableSettings: this.fb.control(null)
    });
  }

  ngOnInit(): void {
    this.report$ = this.reportService.get('dailyOccupancy');
    this.settingsSub = this.settingsService.liveSettingsFromModule('DailyOccupancy');
    this.settingsSub.pipe(first()).subscribe((v) => {
      this.form.patchValue(v, {emitEvent: false});
    });
    this.form.valueChanges.subscribe((v) => {
      this.settingsService.patchItems('DailyOccupancy', v);
    });
    this.reportData$ = combineLatest(
      this.settingsSub,
      this.report$
    ).pipe(
      switchMap(([settings, report]) => this.reportService.getData(merge(
        cloneDeep(settings),
        {report: report.code},
        {fields: settings.fields.map(f => this.fieldsList.find((v) => v.key === f))}
      )))
    );

    this.listOfData = this.generateData();

  }

  ngOnDestroy() {
  }

  displayFilterModal() {
    const modal = this.modalService.create({
      nzTitle: 'Filtros',
      nzContent: FilterComponent,
      nzStyle: {
        width: '800px'
      },
      nzComponentParams: {
        query: this.form.get('filter.values').value,
        report: REPORT_CODE
      }
    }).afterClose.asObservable().subscribe((r) => {
      if (!isUndefined(r)) {
        this.form.get('filter.values').patchValue(r);
      }
      modal.unsubscribe();
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

  onQueryParamsChange(params: NzTableQueryParams) {
    const {pageSize, pageIndex, sort, filter} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.form.get('tableSettings').patchValue({pageIndex, pageSize, sortField, sortOrder, filter});
  }

  csvExport() {
    const csvSubscription = this.reportData$.subscribe(d => {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Ocupación diaria',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        filename: 'Reporte generado'
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(d.current);
      csvSubscription.unsubscribe();
    });
  }
}
