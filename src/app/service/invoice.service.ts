import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoie(){
    return this.http.get<any>('http://localhost:5186/api/Invoice');
  }

  getInvoieId(){
    return this.http.get<any>('http://localhost:5186/api/lastinvoiceID');
  }

  createInvoice(data: any){
    return this.http.post<any>('http://localhost:5186/api/add-new-invoice',data);
  }

  updateProduct(data: any){
    return this.http.post<any>('http://localhost:5186/api/update-product-invoice',data);
  }
}
