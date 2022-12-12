import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientPageComponent } from './client-page/client-page.component';

const routes: Routes = [
  { path: 'list', component: ClientListComponent },
  { path: 'page', component: ClientPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
