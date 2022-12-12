import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../shared/pipes/pipes.module';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoPageComponent } from './produto-page/produto-page.component';


@NgModule({
  declarations: [
    ProdutoListComponent,
    ProdutoPageComponent
  ],
  imports: [
    PipesModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
