import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  getVendor(){
    return this.http.get<any>('http://localhost:5186/api/Vendor');
  }

  getVendorById(data: any){
    return this.http.post<any>('http://localhost:5186/api/get_vendor_by_id',data);
  }

  CUDVendor(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('http://localhost:5186/api/CUDVendor', requestData);
  }
}
