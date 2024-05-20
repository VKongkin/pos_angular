import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url:any ="https://apipos-606dcb9fa81c.herokuapp.com"
  constructor(private http: HttpClient) { }

  getInvoie(){
    return this.http.get<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/Invoice');
  }

  getInvoieId(){
    return this.http.get<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/lastinvoiceID');
  }

  createInvoice(data: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/add-new-invoice',data);
  }

  updateProduct(data: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/update-product-invoice',data);
  }
}
