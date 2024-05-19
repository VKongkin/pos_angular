import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get<any>('http://localhost:5186/api/Product');
  }

  addProductWithImg(data: any){
    return this.http.post<any>('http://localhost:5186/api/addProductImage', data);
  }

  getProductArr(){
    return this.http.get<any>('http://localhost:5186/api/get-product-list');
  }

  getProductById(data: any){
    return this.http.post<any>('http://localhost:5186/api/get_product_by_id',data);
  }

  getProductsByCategory(category: any){
    return this.http.post<any>('http://localhost:5186/api/ProductGetByCategory',category);
  }

  CUDProduct(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('http://localhost:5186/api/product-cud', requestData);
  }

  searchProducts(searchTerm: string) {
    const url = `http://localhost:5186/api/Product/search?searchTerm=${searchTerm}`;
    return this.http.get<any[]>(url);
  }

  getSKU(){
    return this.http.get<any>('http://localhost:5186/api/Sku');
  }

  getSkuById(data: any){
    return this.http.post<any>('http://localhost:5186/api/get_sku_by_id',data);
  }

  CUDSku(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('http://localhost:5186/api/sku_CUD', requestData);
  }

  getCategory(){
    return this.http.get<any>('http://localhost:5186/api/Category');
  }

  getCategoryById(data: any){
    return this.http.post<any>('http://localhost:5186/api/get_category_by_id',data);
  }

  CUDCategory(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('http://localhost:5186/api/category_cud', requestData);
  }
}
