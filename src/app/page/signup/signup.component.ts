import { Component } from '@angular/core';
import {PersonDTO} from "../../model/person-dto";
import { AuthService } from 'src/app/service/auth.service';
import { Alert } from 'src/app/model/alert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})

export class SignupComponent {

  person:PersonDTO;
  alert!:Alert;

  constructor(private authService:AuthService){
    this.person = new PersonDTO();
  }

  public register(){
    const object = this;
    this.authService.registrar(this.person).subscribe({
      next: data => {
        object.alert = new Alert(data.response, "success");
      },
      error: error => {
        object.alert = new Alert(error.error.response, "danger");
      }
      });
  }

  public passwordEquals():boolean{
    return this.person.password == this.person.confirmedPassword;
  }
}
