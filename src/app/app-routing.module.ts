import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cliente', loadChildren: () => import('./clientes/clientes.module').then(cli => cli.ClientesModule) },
  { path: 'produto', loadChildren: () => import('./produtos/produtos.module').then(pro => pro.ProdutosModule) },
  { path: 'pedido', loadChildren: () => import('./pedidos/pedidos.module').then(ped => ped.PedidosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
