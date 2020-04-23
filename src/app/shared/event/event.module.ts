import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzFormModule,
  NzInputModule,
  NzModalModule,
  NzSelectModule,
  NzToolTipModule
} from 'ng-zorro-antd';
import {IconsProviderModule} from '../../icons-provider.module';



@NgModule({
  declarations: [EventComponent],
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
    NzModalModule,
    NzToolTipModule
  ]
})
export class EventModule { }
