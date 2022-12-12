import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ModeEnum } from '../../shared/enums/mode-enum';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {

  dataSource = [];
  subscriptions = new Subscription();
  displayedColumns: string[] = ['id', 'nome', 'valor_unitario', 'update', 'delete'];

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getAll() {
    this.subscriptions.add(
      this.produtoService
      .getAll()
      .subscribe(
      (value: any) => {
        this.dataSource = value;
      }
    ));
  }

  create() {
    this.router.navigate(['produto/page'], { queryParams: { mode: ModeEnum.CREATE } });
  }

  edit(id: number) {
    this.router.navigate(['produto/page'], { queryParams: { id: id, mode: ModeEnum.UPDATE } });
  }

  delete(id: number) {
    this.router.navigate(['produto/page'], { queryParams: { id: id, mode: ModeEnum.DELETE } });
  }

}
