import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import {FormsModule} from '@angular/forms';
import {NzButtonModule, NzModalModule} from 'ng-zorro-antd';
import {IconsProviderModule} from '../../icons-provider.module';
import {NgxQueryBuilderModule} from '../ngx-query-builder/ngx-query-builder.module';



@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    NgxQueryBuilderModule,
    FormsModule,

    NzButtonModule,
    IconsProviderModule,
    NzModalModule
  ]
})
export class FilterModule { }
