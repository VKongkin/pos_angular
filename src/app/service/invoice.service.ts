import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url:any ="https://aspnetcoreweb-api.de.r.appspot.com/"
  constructor(private http: HttpClient) { }

  getInvoie(){
    return this.http.get<any>(this.url+'api/Invoice');
  }

  getInvoieId(){
    return this.http.get<any>(this.url+'api/lastinvoiceID');
  }

  createInvoice(data: any){
    return this.http.post<any>(this.url+'api/add-new-invoice',data);
  }

  updateProduct(data: any){
    return this.http.post<any>(this.url+'api/update-product-invoice',data);
  }
}
