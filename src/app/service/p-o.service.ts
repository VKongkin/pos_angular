import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class POService {

  constructor(private http: HttpClient) { }

  getPODetail(){
    return this.http.get<any>('http://localhost:5186/api/get-po');
  }

  addPO(data: any){
    return this.http.post<any>('http://localhost:5186/api/add-po',data);
  }
  
  addNewPO(data: any){
    return this.http.post<any>('http://localhost:5186/api/add-new-po',data);
  }

  updateProduct(data: any){
    return this.http.post<any>('http://localhost:5186/api/update-products-new',data);
  }

  CUDpo(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('http://localhost:5186/api/add-po', requestData);
  }

  getPOById(data: any){
    return this.http.post<any>('http://localhost:5186/api/add-po',data);
  }
}
