import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModeEnum } from '../../shared/enums/mode-enum';

import { PedidoService } from '../../services/pedido.service';
import { ProdutoService } from '../../services/produto.service';
import { ClienteService } from '../../services/cliente.service';
import { PedidoVendaItemService } from '../../services/pedido-venda-item.service';


@Component({
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.scss']
})
export class PedidoPageComponent implements OnInit {

  id: number = 0;
  btnMode = 'Salvar';
  formGroup: FormGroup;
  mode: ModeEnum = ModeEnum.CREATE;
  subscriptions = new Subscription();

  clients: any[] = [];
  products: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private pedidoVendaItemService: PedidoVendaItemService
  ) {
    this.formGroup = this.formBuilder.group({
      cliente_id: [null, [Validators.required]],
      itens: this.formBuilder.array([]),
      quantidade: [null],
      total_venda: [null]
    });

  }

  ngOnInit(): void {
    this.id = 0;
    this.getClients();
    this.getProducts();
    this.btnMode = 'Salvar';
    this.formGroup.reset();

    this.subscriptions.add(this.activatedRoute.queryParams.subscribe(
      (value: any) => {
        if (value?.id) {
          this.id = value.id;
        }
        if (value?.mode) {
          this.mode = value.mode;
          if (this.mode === ModeEnum.DELETE) {
            this.btnMode = 'Excluir'
          }
        }
      }
    ));

    if (this.id > 0 && this.mode !== ModeEnum.CREATE) {
      this.getRequest();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  get itens() {
    return this.formGroup.get('itens') as FormArray;
  }

  getClients() {
    this.subscriptions.add(
      this.clienteService.getAll()
        .subscribe(
          (value: any) => {
            this.clients = value;
          }
        ));
  }

  getProducts() {
    this.subscriptions.add(
      this.produtoService
        .getAll()
        .subscribe(
          (value: any) => {
            this.products = value
          }
        ));
  }

  addNewItem() {
    const newItem = this.formBuilder.group({
      id: [],
      produto_id: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      valor_unitario: [null, Validators.required],
      valor_total: [null]
    })

    this.itens.push(newItem);
  }


  calcTotalItem(indice: number, selected?: any) {

    const controls = this.itens.controls[indice];
    const qtde = controls.get('quantidade')?.value;

    let unitVal = 0;
    if (selected && selected.option.value) {
      unitVal = selected.option.value.valor_unitario;
      controls.get('valor_unitario')?.setValue(unitVal * 1);
    } else {
      unitVal = controls.get('valor_unitario')?.value;
    }
    controls.get('valor_total')?.setValue(qtde * unitVal);
    this.sumItens();
  }

  displayFnClient(client: any): string {
    if (client) {
      return client.nome;
    }
    return '';
  }

  displayFnProduct(product: any): string {
    if (product) {
      return product.nome;
    }
    return '';
  }

  getRequest() {
    this.subscriptions.add(
      this.pedidoService.get(this.id)
        .subscribe(
          (value: any) => {
            const client_id = value?.cliente_id;

            setTimeout(() => {
              const client = this.clients.find(el => el.id == client_id);
              this.formGroup.get('cliente_id')?.setValue(client);
            }, 300);

            if (value?.itens?.length > 0) {
              for (let index = 0; index < value.itens.length; index++) {
                this.addNewItem();
              }

              setTimeout(() => {
                const controls = this.itens.controls;
                controls.forEach(control => {
                  const productId = control.get('produto_id')?.value;
                  const product = this.products.find(prod => prod.id === productId);
                  control.get('produto_id')?.setValue(product);
                });
              }, 300);

            }
            this.formGroup.patchValue(value);
          }
        )
    );
  }

  goBack() {
    this.router.navigate(['pedido/list']);
  }

  create() {
    this.subscriptions.add(
      this.pedidoService.create(this.formGroup.value)
        .subscribe(value => {
          this.router.navigate(['pedido/list']);
        }
        ));
  }

  delete() {
    this.subscriptions.add(
      this.pedidoService.delete(this.id)
        .subscribe(value => {
          this.router.navigate(['pedido/list']);
        }));
  }

  deleteItem(indice: number) {
    const controls = this.itens.controls[indice];
    const pedidoId = controls.get('id')?.value;

    this.itens.removeAt(indice);
    this.sumItens();

    if (pedidoId) {
      this.subscriptions.add(
        this.pedidoVendaItemService.delete(pedidoId)
          .subscribe(
            value => { }
          ));
    }
  }


  submit() {
    const cliente = this.formGroup.get('cliente_id')?.value;
    if (cliente && cliente.id) {
      this.formGroup.patchValue({
        cliente_id: cliente.id
      }, { onlySelf: false, emitEvent: false })
    }

    const controls = this.itens.controls;
    controls.forEach(control => {
      const id = control.get('produto_id')?.value?.id;
      if (id) {
        control.get('produto_id')?.setValue(id);
      }
    });

    switch (this.mode) {
      case ModeEnum.CREATE:
        this.create();
        break;

      case ModeEnum.DELETE:
        this.delete();
        break;

      case ModeEnum.UPDATE:
        this.update();
        break;
    }
  }


  sumItens() {
    let total = 0;
    let quantidade = 0;
    const controls = this.itens.controls;
    controls.forEach(control => {
      total += control.get('valor_total')?.value;
      quantidade += control.get('quantidade')?.value;
    });
    this.formGroup.get('total_venda')?.setValue(total);
    this.formGroup.get('quantidade')?.setValue(quantidade);
  }


  update() {
    this.subscriptions.add(
      this.pedidoService
        .update(this.id, this.formGroup.value)
        .subscribe(value => {
          this.router.navigate(['pedido/list']);
        }));
  }


  public get modeEnum(): typeof ModeEnum {
    return ModeEnum;
  }

}
