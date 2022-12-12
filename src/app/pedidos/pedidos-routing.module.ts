import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoPageComponent } from './pedido-page/pedido-page.component';

const routes: Routes = [
  { path: 'list', component: PedidoListComponent },
  { path: 'page', component: PedidoPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
