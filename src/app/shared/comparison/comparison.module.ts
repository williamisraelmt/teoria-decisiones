import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComparisonComponent} from './comparison.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzButtonModule, NzDatePickerModule, NzFormModule, NzInputModule, NzModalModule, NzSelectModule} from 'ng-zorro-antd';
import {IconsProviderModule} from '../../icons-provider.module';


@NgModule({
  declarations: [ComparisonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,

    NzInputModule,
    NzButtonModule,
    IconsProviderModule,
    NzDatePickerModule,
    NzSelectModule,
    NzModalModule
  ]
})
export class ComparisonModule {
}
