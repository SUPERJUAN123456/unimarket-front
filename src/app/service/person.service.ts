import { Injectable } from '@angular/core';
import { MessageDTO } from '../model/message-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PasswordDTO } from '../model/password-dto';
import { PersonGetDTO } from '../model/person-get-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private userUrl = "http://localhost:8080/api/personas";

  constructor(private http: HttpClient) { }
  
  public updatePerson(id:string, person:PersonGetDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userUrl}/actualizar/${id}`, person);
  }

  public changePasswordRecuperated(id:string, password:PasswordDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userUrl}/recuperar_contraseña/${id}`, password);
  }

  public changeOldPassword(id:string, password:PasswordDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userUrl}/cambiar_contraseña/${id}`, password);
  }

  public recuperatePassword(email:string): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.userUrl}/recuperar_contraseña`, email);
  }
}
