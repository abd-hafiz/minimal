import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ListComponent } from './list/list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UiSwitchModule} from "ngx-ui-switch";


@NgModule({
  declarations: [
    ListComponent
  ],
    imports: [
        CommonModule,
        ServicesRoutingModule,
        ReactiveFormsModule,
        UiSwitchModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesModule { }
