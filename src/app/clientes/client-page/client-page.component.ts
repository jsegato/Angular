import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ModeEnum } from '../../shared/enums/mode-enum';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  id: number = 0;
  btnMode = 'Salvar';
  formGroup: FormGroup;
  mode: ModeEnum = ModeEnum.CREATE;
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      data_nascimento: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = 0;
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
      this.getClient();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  create() {
    this.subscriptions.add(
      this.clienteService.create(this.formGroup.value)
        .subscribe(value => {
          this.router.navigate(['cliente/list']);
        }
        ));
  }

  delete() {
    this.subscriptions.add(
      this.clienteService.delete(this.id)
        .subscribe(value => {
          this.router.navigate(['cliente/list']);
        }));
  }

  getClient() {
    this.subscriptions.add(
      this.clienteService.get(this.id)
        .subscribe(
          value => {
            this.formGroup.patchValue(value);
          }
        )
    );
  }

  goBack() {
    this.router.navigate(['cliente/list']);
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

  update() {
    this.subscriptions.add(this.clienteService.update(this.id, this.formGroup.value)
      .subscribe(value => {
        this.router.navigate(['cliente/list']);
      }));
  }

  public get modeEnum(): typeof ModeEnum {
    return ModeEnum;
  }
}
