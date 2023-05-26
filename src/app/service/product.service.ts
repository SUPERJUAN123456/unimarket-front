import { Injectable } from '@angular/core';
import { ProductGetDTO } from "../model/product-get-dto";
import { ImageDto } from '../model/image-dto';
import { ProductDTO } from '../model/product-dto';
import { MessageDTO } from '../model/message-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: ProductGetDTO[];

  private userUrl = "http://localhost:8080/api/productos";
  constructor(private http: HttpClient) {

  }
  public listarAllProducts(): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener_productos`);
  }

  public getProduct(id: number): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener/${id}`);
  }

  public listProductByCategory(category: string): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener_productos_categoria/${category}`);
  }

  public listProductByPerson(idPerson: string): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener_productos_person/${idPerson}`);
  }

  public listFavoriteProducts(idPerson: string): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener_favoritos_persona/${idPerson}`);
  }

  public listProductByPrice(maxPrice: number, minPrice: number): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener_productos_precio/${minPrice}/${maxPrice}`);
  }  

  public listProductByTitle(title: string): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener_productos_titulo/${title}`);
  }

  public addProductToFavorite(idPerson: string, idProduct: string): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(`${this.userUrl}/agregar_producto_favorito/${idPerson}/${idProduct}`, idPerson);
  }

  public deleteProductToFavorite(idPerson: string, idProduct: string): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.userUrl}/quitar_producto_favorito/${idPerson}/${idProduct}`);
  }

  public createProduct(product: ProductDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(`${this.userUrl}/crear`, product);
  }

  public updateProduct(id: number, product: ProductGetDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userUrl}/actualizar/${id}`, product);

  }

  public deleteProduct(id: number): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.userUrl}/eliminar/${id}`);
  }

 /* public get(idProduct: number) {
    this.products.forEach((product) => {
      
    });
  }*/

}
