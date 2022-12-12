import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoPageComponent } from './produto-page/produto-page.component';

const routes: Routes = [
  { path: 'list', component: ProdutoListComponent },
  { path: 'page', component: ProdutoPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
