import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../shared/pipes/pipes.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientPageComponent } from './client-page/client-page.component';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientPageComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ClientesRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class ClientesModule { }
