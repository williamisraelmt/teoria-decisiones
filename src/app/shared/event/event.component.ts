import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd';
import {EventService} from './event.service';
import {Observable} from 'rxjs';
import {IReport} from '../models/report';
import {ReportService} from '../services/report.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  form: FormGroup;

  reports$: Observable<IReport[]>;
  eventTypes$: Observable<any[]>;
  events$: Observable<any[]>;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private eventService: EventService,
    private reportService: ReportService) {
  }

  ngOnInit(): void {

    this.reports$ = this.reportService.getAll();

    this.eventTypes$ = this.eventService.getEventTypes();

    this.events$ = this.eventService.getAll();

    this.form = this.fb.group({
      description: this.fb.control(null, [Validators.required]),
      event_id: this.fb.control(null),
      event_type: this.fb.control(null, [Validators.required]),
      way_it_affects: this.fb.control(null, [Validators.required]),
      reports: this.fb.control(null, [Validators.required]),
      start_date: this.fb.control(null, [Validators.required]),
      end_date: this.fb.control(null)
    });
  }

  cancel(): void {
    this.modal.destroy();
  }

  accept(): void {
    if (this.form.invalid) {
      return;
    }
    this.eventService.create(this.form.value).subscribe(() => {
      this.modal.destroy();
    }, (error) => {
      console.log(error);
    });
  }

}
