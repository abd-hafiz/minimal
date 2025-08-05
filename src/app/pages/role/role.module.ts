import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { ListComponent } from './list/list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UiSwitchModule} from "ngx-ui-switch";


@NgModule({
  declarations: [
    ListComponent
  ],
    imports: [
        CommonModule,
        RoleRoutingModule,
        ReactiveFormsModule,
        UiSwitchModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoleModule { }
