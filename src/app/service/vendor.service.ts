import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  url:any ="https://apipos-606dcb9fa81c.herokuapp.com"
  constructor(private http: HttpClient) { }

  getVendor(){
    return this.http.get<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/Vendor');
  }

  getVendorById(data: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/get_vendor_by_id',data);
  }

  CUDVendor(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/CUDVendor', requestData);
  }
}
