import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {IconsProviderModule} from '../../icons-provider.module';
import {
  NzButtonModule,
  NzCardModule, NzCheckboxModule,
  NzDatePickerModule,
  NzGridModule, NzModalModule,
  NzSelectModule,
  NzTableModule, NzTagModule,
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {FilterModule} from '../../shared/filter/filter.module';
import {ComparisonModule} from '../../shared/comparison/comparison.module';
import {EventModule} from '../../shared/event/event.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    IconsProviderModule,
    FormsModule,
    NzDatePickerModule,
    NzSelectModule,
    NzSpaceModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzCheckboxModule,
    NzTagModule,

    FilterModule,
    ComparisonModule,
    EventModule
  ]
})
export class DashboardModule { }
