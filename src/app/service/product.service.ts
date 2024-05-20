import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
url:any ="https://apipos-606dcb9fa81c.herokuapp.com"
  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/Product');
  }

  addProductWithImg(data: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/addProductImage', data);
  }

  getProductArr(){
    return this.http.get<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/get-product-list');
  }

  getProductById(data: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/get_product_by_id',data);
  }

  getProductsByCategory(category: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/ProductGetByCategory',category);
  }

  CUDProduct(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/product-cud', requestData);
  }

  searchProducts(searchTerm: string) {
    const url = `url/api/Product/search?searchTerm=${searchTerm}`;
    return this.http.get<any[]>(url);
  }

  getSKU(){
    return this.http.get<any>('url/api/Sku');
  }

  getSkuById(data: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/get_sku_by_id',data);
  }

  CUDSku(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/sku_CUD', requestData);
  }

  getCategory(){
    return this.http.get<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/Category');
  }

  getCategoryById(data: any){
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/get_category_by_id',data);
  }

  CUDCategory(data: any, cud: string) {
    // Add the 'cud' property to the request body
    const requestData = { ...data, cud };
  
    return this.http.post<any>('https://apipos-606dcb9fa81c.herokuapp.com/api/category_cud', requestData);
  }
}
