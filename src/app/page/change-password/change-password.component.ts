import { Component } from '@angular/core';
import {PasswordDTO} from "../../model/password-dto";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePassword:PasswordDTO;
  constructor() {
    this.changePassword = new PasswordDTO();
  }
  public changePasswordFunction(){
    console.log(this.changePassword);
  }
  public passwordEquals():boolean{
    return this.changePassword.password == this.changePassword.confirmedPassword;
  }

}
