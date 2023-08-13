import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../types/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsURL = 'assets/data.json';
  storage = window.localStorage
  
  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }

  addProduct(product: Product[]) {
    this.storage.setItem('products', JSON.stringify(product));
  }
}
