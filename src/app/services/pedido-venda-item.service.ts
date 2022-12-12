import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoVendaItemService {

  private api: string;
  private baseUrl = 'pedido-venda-item';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.api = environment.API_URL;
    this.headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
   }


   delete(id: number) {
    const completeUrl = `${this.api}${this.baseUrl}/${id}`;
    return this.http.delete(completeUrl, { headers: this.headers });
  }
}
