import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {DailyOccupancyComponent} from './daily-occupancy/daily-occupancy.component';
import {DailyPayrollComponent} from './daily-payroll/daily-payroll.component';
import {DailyRotationComponent} from './daily-rotation/daily-rotation.component';
import {DailyEquipmentAuditComponent} from './daily-equipment-audit/daily-equipment-audit.component';


const routes: Routes = [
  { path: 'daily-occupancy', component: DailyOccupancyComponent },
  { path: 'daily-payroll', component: DailyPayrollComponent },
  { path: 'daily-rotation', component: DailyRotationComponent },
  { path: 'daily-equipment-audit', component: DailyEquipmentAuditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
