import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000'; // Substitua pela URL do seu servidor back-end

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.apiUrl}/products/1/listProduct`)
  }

  deleteProducts(productId: number) {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }

  addProducts(Product:any) {
    return this.http.post(`${this.apiUrl}/products`,  Product)
  }

}
