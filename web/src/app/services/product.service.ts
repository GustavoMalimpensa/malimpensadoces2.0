import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.apiUrl}/products/1/listProduct`)
  }

  addProducts(Product:any) {
    return this.http.post(`${this.apiUrl}/products`,  Product)
  }

  editProduct(productId: number, productData: any) {
    return this.http.put(`${this.apiUrl}/products/${productId}`, productData);
  }

  deleteProducts(productId: number) {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }

}
