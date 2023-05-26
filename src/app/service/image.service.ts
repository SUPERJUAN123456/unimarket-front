import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MessageDTO } from '../model/message-dto';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imgURL = "http://localhost:8080/api/imagenes";

  constructor(private http: HttpClient) { }

  public subir(file: FormData): Observable<MessageDTO> {
  return this.http.post<MessageDTO>(`${this.imgURL}/subir`, file);
  }
  public eliminar(id: string): Observable<MessageDTO> {
  return this.http.delete<MessageDTO>(`${this.imgURL}/eliminar/${id}`);
  }
}
