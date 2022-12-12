import { TestBed } from '@angular/core/testing';

import { PedidoVendaItemService } from './pedido-venda-item.service';

describe('PedidoVendaItemService', () => {
  let service: PedidoVendaItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoVendaItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
