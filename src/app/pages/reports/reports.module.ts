import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { DailyOccupancyComponent } from './daily-occupancy/daily-occupancy.component';
import { DailyPayrollComponent } from './daily-payroll/daily-payroll.component';
import { DailyRotationComponent } from './daily-rotation/daily-rotation.component';
import { DailyEquipmentAuditComponent } from './daily-equipment-audit/daily-equipment-audit.component';
import {
  NgZorroAntdModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDatePickerModule, NzDividerModule,
  NzGridModule,
  NzModalModule,
  NzSelectModule,
  NzTableModule, NzTagModule
} from 'ng-zorro-antd';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconsProviderModule} from '../../icons-provider.module';
import {FilterModule} from '../../shared/filter/filter.module';
import {ComparisonModule} from '../../shared/comparison/comparison.module';


@NgModule({
  declarations: [DailyOccupancyComponent, DailyPayrollComponent, DailyRotationComponent, DailyEquipmentAuditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,

    IconsProviderModule,
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
    NzDividerModule,
    NgZorroAntdModule


  ]
})
export class ReportsModule { }
