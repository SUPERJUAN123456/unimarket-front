export class PaymentMethodDTO {
  cardNumber:string = "";
  titularName:string = "";
  bankingEntity:string = "";
  expirationDate:Date = new Date();
  cvv:number = 0;
  idPerson:string = "";
}
