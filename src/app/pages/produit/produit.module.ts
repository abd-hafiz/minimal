import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule
  ]
})
export class ProduitModule { }
