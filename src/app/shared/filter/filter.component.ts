import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {QueryBuilderFieldMap, RuleSet} from '../ngx-query-builder/interfaces/ngx-query-builder.interfaces';
import {reportsFields} from '../../helpers/field-types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  report: string;
  query: RuleSet = {
    condition: 'and',
    rules: []
  };

  fieldMap: QueryBuilderFieldMap;

  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {
    this.fieldMap = reportsFields[this.report];
  }

  cancel(): void {
    this.modal.destroy();
  }

  accept(): void {
    this.modal.destroy(this.query);
  }
}
