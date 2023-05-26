import { Component } from '@angular/core';
import { SessionService } from 'src/app/service/session.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.css']
})
export class BuysComponent {
  isLogged:boolean = false;
  idPerson!:string;

  constructor(private sessionService : SessionService, private tokenService : TokenService){}

  ngOnInit(): void {
    const objeto = this;
    this.sessionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());
  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.idPerson = this.tokenService.getId()     
    }
  }

}
