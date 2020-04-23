import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

  type: any;
  values: any;
  form: FormGroup;

  constructor(private modal: NzModalRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: this.fb.control(this.type, [Validators.required]),
      values: this.fb.control(this.values),
    });
  }

  cancel(): void {
    this.modal.destroy();
  }

  accept(): void {
    if (this.form.invalid){
      this.form.get('type').markAsTouched();
      this.form.get('values').markAsTouched();
      return;
    }
    this.modal.destroy(this.form.value);
  }
}
