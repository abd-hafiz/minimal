import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRoutingModule } from './demande-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    DemandeRoutingModule
  ]
})
export class DemandeModule { }
