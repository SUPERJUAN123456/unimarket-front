import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonDTO } from '../model/person-dto';
import { Observable } from 'rxjs';
import { MessageDTO } from '../model/message-dto';
import { SessionDTO } from '../model/session-dto';
import { TokenDTO } from '../model/token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";
  constructor(private http:HttpClient) { }

  public registrar(usuario:PersonDTO):Observable<MessageDTO>{
    return this.http.post<MessageDTO>(`${this.authURL}/registro`, usuario);
  }
  
  public login(sesion:SessionDTO):Observable<MessageDTO>{
    return this.http.post<MessageDTO>(`${this.authURL}/login`, sesion);
  }
  public refresh(token:TokenDTO):Observable<MessageDTO>{
    return this.http.post<MessageDTO>(`${this.authURL}/refresh`, token);
  }
  
}
