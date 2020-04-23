import { Injectable } from '@angular/core';
import {QueryBuilderFieldMap, Rule} from '../interfaces/ngx-query-builder.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  readonly INPUT_TYPE_STRING = 'string';
  readonly INPUT_TYPE_INTEGER = 'integer';
  readonly INPUT_TYPE_DOUBLE = 'double';
  readonly INPUT_TYPE_TIME = 'time';
  readonly INPUT_TYPE_DATE = 'date';
  readonly INPUT_TYPE_SELECT = 'select';
  readonly INPUT_TYPE_BOOLEAN = 'boolean';

  readonly INPUT_TYPE_MULTI_SELECT = 'multi_select';

  readonly NULLABLE_OPERATORS = ['is_null', 'is_not_null'];
  readonly EMPTY_OPERATORS = ['is_empty', 'is_not_empty'];
  readonly MULTI_SELECT_OPERATORS = ['in', 'not_in'];

  private readonly defaultOperator = 'equal';

  private readonly operatorsMap: { [key: string]: string[] } = {
    string: ['equal', 'not_equal', 'contains', 'not_contains', 'begins_with', 'not_begins_with', 'ends_with', 'not_ends_with'],
    integer: ['equal', 'not_equal', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
    double: ['equal', 'not_equal', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
    time: ['equal', 'not_equal', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
    date: ['equal', 'not_equal', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
    select: ['equal', 'not_equal', ...this.MULTI_SELECT_OPERATORS],
    boolean: ['equal'],
  };

  private readonly operatorsDisplayNames: { [key: string]: string } = {
    equal: 'igual a',
    not_equal: 'no es igual a',
    contains: 'contiene',
    not_contains: 'no contiene',
    begins_with: 'comienza con',
    not_begins_with: 'no comienza con',
    ends_with: 'termina con',
    not_ends_with: 'no termina con',
    greater: 'mayor que',
    greater_or_equal: 'mayor o igual que',
    less: 'menor que',
    less_or_equal: 'menor o igual que',
    is_null: 'nulo',
    is_not_null: 'no es nulo',
    is_empty: 'vacío',
    is_not_empty: 'no está vacío',
    in: 'exista en',
    not_in: 'no exista en'
  };

  constructor() { }

  getOperators(rule: Rule, fieldMap: QueryBuilderFieldMap): string[] {

    if (!this.getAvailableTypes().includes(rule.type)) {
      console.error('Type of rule is not valid. Please use one of the following types: ' + this.getAvailableTypes().join(', '));
    }

    let operators = this.operatorsMap[rule.type];

    // allow nullable
    if (fieldMap[rule.field].settings && fieldMap[rule.field].settings.nullableOperators) {
      operators = [...operators, ...this.NULLABLE_OPERATORS];
    }

    // allow empty
    if (fieldMap[rule.field].settings && fieldMap[rule.field].settings.emptyOperators) {
      operators = [...operators, ...this.EMPTY_OPERATORS];
    }

    return operators;
  }

  getDefaultOperator() {
    return this.defaultOperator;
  }

  getOperatorsWithoutInput(): string[] {
    return [...this.NULLABLE_OPERATORS, ...this.EMPTY_OPERATORS];
  }

  getOperatorDisplayName(operator: string): string {
    if (this.operatorsDisplayNames[operator]) {
      return this.operatorsDisplayNames[operator];
    }
    return operator;
  }

  private getAvailableTypes(): string[] {
    return [
      this.INPUT_TYPE_STRING,
      this.INPUT_TYPE_INTEGER,
      this.INPUT_TYPE_DOUBLE,
      this.INPUT_TYPE_TIME,
      this.INPUT_TYPE_DATE,
      this.INPUT_TYPE_SELECT,
      this.INPUT_TYPE_BOOLEAN
    ];
  }
}
