import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule
  ]
})
export class UtilisateurModule { }
