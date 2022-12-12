import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { PipesModule } from '../shared/pipes/pipes.module';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoPageComponent } from './pedido-page/pedido-page.component';


@NgModule({
  declarations: [
    PedidoListComponent,
    PedidoPageComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PedidosRoutingModule,
    MatAutocompleteModule
  ]
})
export class PedidosModule { }
