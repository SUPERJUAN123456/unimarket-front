import { Component } from '@angular/core';
import { SessionService } from 'src/app/service/session.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isLogged = false;
  isMod = false;
  idPerson: string = "";
  name:string = "";
  roles!: string[];

  constructor(private tokenService: TokenService, private sessionService : SessionService) {

  }
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.idPerson = this.tokenService.getId();
      this.name = this.tokenService.getName();
    }
    this.roles = this.tokenService.getRol();
    if(this.roles[0] == "MODERADOR"){
      this.isMod = true;
    }
  }
  public logout() {
    this.tokenService.logout();
  }

}
