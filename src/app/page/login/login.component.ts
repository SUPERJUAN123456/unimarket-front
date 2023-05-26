import { Component } from '@angular/core';
import { LoginDTO } from "../../model/login-dto";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { Alert } from 'src/app/model/alert';
import { SessionDTO } from 'src/app/model/session-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginPerson: SessionDTO;
  alert!:Alert;

  constructor(public router: Router, public authService: AuthService, public tokenService : TokenService) {
    this.loginPerson = new SessionDTO();
  }
  public loginAction() {
    const object = this;
    this.authService.login(this.loginPerson).subscribe({
      next: data => {
        object.tokenService.login(data.response.token);
      },
      error: error => {
         object.alert = new Alert (error.error.response, "danger");
      }
    });
  }

}

