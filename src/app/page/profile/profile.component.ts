import { Component } from '@angular/core';
import { Alert } from 'src/app/model/alert';
import { PersonDTO } from 'src/app/model/person-dto';
import { SessionService } from 'src/app/service/session.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  person!:PersonDTO;
  isLogged:boolean = false;
  idPerson!:string;
  alert!:Alert;

  constructor(private sessionService:SessionService,private tokenService:TokenService) {
    this.person = new PersonDTO();
  }
 /* ngOnInit(): void {
    const objeto = this;
    this.sessionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());

    /*this.personService.get(this.idPerson).suscribe({
      next: data => {
        this.person = data.response;
      }
    })

  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.idPerson = this.tokenService.getId();
    }
  }*/

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.idPerson = this.tokenService.getId();
    }
  }

  public updatePerson(){
    console.log(this.person);
  }
}
