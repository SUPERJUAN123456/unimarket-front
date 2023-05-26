import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethodGetDto } from 'src/app/model/payment-method-get-dto';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { SessionService } from 'src/app/service/session.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {

  paymentMethods!:PaymentMethodGetDto[];
  idPaymentMethod!:number;
  isLogged: boolean = false;
  idPerson!:string;

  constructor(private router: Router, private paymentMethodService:PaymentMethodService, private sessionService : SessionService, private tokenService : TokenService){

  }
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.idPerson = this.tokenService.getId()
       console.log(this.idPerson);
      this.paymentMethodService.listPaymentMethodByPerson(this.idPerson).subscribe({
        next: data => {
          this.paymentMethods = data.response;
        },
        error: error => {
          console.log(error.error.response);
        }
      });
    }
  }

  /*ngOnInit(): void {
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
      this.idPerson = this.tokenService.getId();
      this.paymentMethodService.listPaymentMethodByPerson(this.idPerson).subscribe({
        next: data => {
          this.paymentMethods = data.response;
        },
        error: error => {
          console.log(error.error);
        }
      });
    }
  }*/

  public editPaymentMethod(id:number){
    this.router.navigate(["/editar_metodo_de_pago",id]);
  }

  public addPaymentMethod(){
    this.router.navigate(["/añadir_metodo_de_pago"]);
  }

  public deletePaymentMethod(id:number){
      this.paymentMethodService.deletePaymentMethod(id).subscribe({
        next: data => {
          console.log(data.response);
        },
        error: error => {
          console.log(error.error);
        }
      });
  }

}
