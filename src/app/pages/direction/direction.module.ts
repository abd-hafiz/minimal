import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectionRoutingModule } from './direction-routing.module';
import { ListComponent } from './list/list.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListComponent
  ],
    imports: [

        CommonModule,
        DirectionRoutingModule,
        ReactiveFormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DirectionModule { }
