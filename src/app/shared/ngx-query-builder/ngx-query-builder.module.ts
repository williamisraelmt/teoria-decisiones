import { NgModule } from '@angular/core';
import { NgxQueryBuilderComponent } from './ngx-query-builder.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NzDatePickerModule, NzTimePickerModule} from 'ng-zorro-antd';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzDatePickerModule,
    NzTimePickerModule
  ],
  exports: [
    NgxQueryBuilderComponent
  ],
  declarations: [
    NgxQueryBuilderComponent,
  ],
})
export class NgxQueryBuilderModule { }
