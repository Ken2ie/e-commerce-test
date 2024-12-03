import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../../utils/constants/api.bast';
import { Product } from '../../utils/interfaces/e-commerce.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  headers! : HttpHeaders;

  constructor() {
    
  this.headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'X-Skip-JWT-Interceptor': 'true',
  });
   }

  
  httpClient = inject(HttpClient);

  getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<any>(`${API_BASE_URL}/products`, {headers: this.headers}).pipe(
      map(products => products.map((product : Product) => ({
        ...product,
        quantity: 1 // Add default quantity of 1 to each product
      }))));
  }

  getAProduct(id : string): Observable<Array<Product>> {
    return this.httpClient.get<any>(`${API_BASE_URL}/products/${id}`, {headers: this.headers});
  }
 
  getAllProductsInCategory(category : string): Observable<Array<Product>> {
    return this.httpClient.get<any>(`${API_BASE_URL}/products/category/${category}`, {headers: this.headers});
  }

  getProductCategory(): Observable<Array<string>> {
    return this.httpClient.get<any>(`${API_BASE_URL}/products/categories`, {headers: this.headers});
  }


}
