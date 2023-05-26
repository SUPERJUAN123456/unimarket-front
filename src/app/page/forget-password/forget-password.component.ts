import { Component } from '@angular/core';
import {LoginDTO} from "../../model/login-dto";
import {ForgetPasswordDTO} from "../../model/forget-password-dto";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  forgetPassword:ForgetPasswordDTO;
  constructor() {
    this.forgetPassword = new ForgetPasswordDTO();
  }

  public forgetPasswordFunction(){
    console.log(this.forgetPassword);
  }

}
