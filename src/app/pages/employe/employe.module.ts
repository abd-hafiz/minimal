import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeRoutingModule } from './employe-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { OverviewComponent } from './overview/overview.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    OverviewComponent
  ],
    imports: [
        CommonModule,
        EmployeRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class EmployeModule { }
