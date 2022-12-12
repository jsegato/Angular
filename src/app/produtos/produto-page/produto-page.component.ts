import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModeEnum } from '../../shared/enums/mode-enum';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-page',
  templateUrl: './produto-page.component.html',
  styleUrls: ['./produto-page.component.scss']
})
export class ProdutoPageComponent implements OnInit {

  id: number = 0;
  btnMode = 'Salvar';
  formGroup: FormGroup;
  mode: ModeEnum = ModeEnum.CREATE;
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private produtoService: ProdutoService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required]],
      valor_unitario: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = 0;
    this.btnMode = 'Salvar';
    this.formGroup.reset();
    this.subscriptions.add(
      this.activatedRoute.queryParams
        .subscribe(
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
      this.getProduct();
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submit() {
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


  getProduct() {
    this.subscriptions.add(
      this.produtoService.get(this.id)
        .subscribe(
          value => {
            this.formGroup.patchValue(value);
          }
        )
    );
  }

  goBack() {
    this.router.navigate(['produto/list']);
  }


  create() {
    this.subscriptions.add(
      this.produtoService.create(this.formGroup.value)
        .subscribe(value => {
          this.router.navigate(['produto/list']);
        }
        ));
  }

  delete() {
    this.subscriptions.add(
      this.produtoService
        .delete(this.id)
        .subscribe(value => {
          this.router.navigate(['produto/list']);
        }));
  }


  update() {
    this.subscriptions.add(
      this.produtoService
        .update(this.id, this.formGroup.value)
        .subscribe(value => {
          this.router.navigate(['produto/list']);
        }))
  }


  public get modeEnum(): typeof ModeEnum {
    return ModeEnum;
  }
}
