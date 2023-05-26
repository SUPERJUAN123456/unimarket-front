import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDTO } from '../model/message-dto';
import { ProductGetDTO } from '../model/product-get-dto';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  private userUrl = "http://localhost:8080/api/moderador";

  constructor(private http: HttpClient) { }
  
  public listProductByState(state: string): Observable<MessageDTO> {
    return this.http.get<MessageDTO>(`${this.userUrl}/obtener_productos_estado/${state}`);
  }

  public reviewProduct(idProduct: number, productGetDto: ProductGetDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userUrl}/revisar_producto/${idProduct}`,productGetDto);
  }

}
