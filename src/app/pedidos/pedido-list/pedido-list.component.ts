import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ModeEnum } from '../../shared/enums/mode-enum';
import { PedidoService } from '../../services/pedido.service';


@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {

  dataSource = [];
  subscriptions = new Subscription();
  displayedColumns: string[] = ['id', 'created_at', 'cliente_nome', 'total_venda', 'update', 'delete'];

  constructor(
    private router: Router,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getAll() {
    this.subscriptions.add(this.pedidoService.getAll().subscribe(
      (value: any) => {
        this.dataSource = value;
      }
    ));
  }

  create() {
    this.router.navigate(['pedido/page'], { queryParams: { mode: ModeEnum.CREATE } });
  }

  edit(id: number) {
    this.router.navigate(['pedido/page'], { queryParams: { id: id, mode: ModeEnum.UPDATE } });
  }

  delete(id: number) {
    this.router.navigate(['pedido/page'], { queryParams: { id: id, mode: ModeEnum.DELETE } });
  }

}
