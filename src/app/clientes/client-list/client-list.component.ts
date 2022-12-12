import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ModeEnum } from '../../shared/enums/mode-enum';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {


  dataSource = [];
  subscriptions = new Subscription();
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'data_nascimento', 'update', 'delete'];

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  private getAll() {
    this.subscriptions.add(
      this.clienteService.getAll().subscribe(
        (value: any) => {
          this.dataSource = value;
        }
      ));
  }

  create() {
    this.router.navigate(['cliente/page'], { queryParams: { mode: ModeEnum.CREATE } });
  }

  edit(id: number) {
    this.router.navigate(['cliente/page'], { queryParams: { id: id, mode: ModeEnum.UPDATE } });
  }

  delete(id: number) {
    this.router.navigate(['cliente/page'], { queryParams: { id: id, mode: ModeEnum.DELETE } });
  }

}
