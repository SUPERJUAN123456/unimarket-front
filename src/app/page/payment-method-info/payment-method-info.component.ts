import { Component } from '@angular/core';
import {PaymentMethodDTO} from "../../model/payment-method-dto";
import { SessionService } from 'src/app/service/session.service';
import { TokenService } from 'src/app/service/token.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethodGetDto } from 'src/app/model/payment-method-get-dto';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method-info.component.html',
  styleUrls: ['./payment-method-info.component.css']
})
export class PaymentMethodInfoComponent {
  
  isLogged:boolean = false;
  paymentMethod!: PaymentMethodDTO;
  idPerson!:string;
  idPaymentMethod!:string;

  constructor(private route: ActivatedRoute,private paymentMethodService : PaymentMethodService,private sessionService : SessionService, private tokenService : TokenService) {
    this.route.params.subscribe(params => {
      this.idPaymentMethod = params["id"];      
  });
}

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

  public createPaymentMethod(){
    this.paymentMethod.idPerson = this.idPerson;
      this.paymentMethodService.createPaymentMethod(this.paymentMethod).subscribe({
        next: data => {
          console.log(data.response);
        },
        error: error => {
          console.log(error.error);
        }
      });
  }

  public updatePaymentMethod(idPaymentMethod:number, paymentMethodGetDto:PaymentMethodGetDto){
    this.paymentMethodService.updatePaymentMethod(idPaymentMethod,paymentMethodGetDto);
  }

}
