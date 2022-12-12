import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private api: string;
  private baseUrl = 'cliente';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.api = environment.API_URL;
    this.headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  }


  create(fields: object) {
    const completeUrl = `${this.api}${this.baseUrl}`;
    return this.http.post(completeUrl, fields, { headers: this.headers });
  }

  get(id: number) {
    const completeUrl = `${this.api}${this.baseUrl}/${id}`;
    return this.http.get(completeUrl, { headers: this.headers });
  }

  getAll() {
    const completeUrl = `${this.api}${this.baseUrl}`;
    return this.http.get(completeUrl, { headers: this.headers });
  }

  update(id: number, fields: object) {
    const completeUrl = `${this.api}${this.baseUrl}/${id}`;
    return this.http.put(completeUrl, fields, { headers: this.headers });
  }

  delete(id: number) {
    const completeUrl = `${this.api}${this.baseUrl}/${id}`;
    return this.http.delete(completeUrl, { headers: this.headers });
  }
}
