export class PaymentMethodGetDto {
    id:number = 0;
    bankingEntity:string = "";
    titularName:string = "";
    cardNumber:string = "";
    expirationDate:Date = new Date();
    cvv:number = 0;
    state:boolean = false;
    idPerson:string = "";

    constructor(id:number,
        bankingEntity:string,
        titularName:string,
        cardNumber:string,
        expirationDate:Date,
        cvv:number,
        state:boolean,
        idPerson:string,){
            this.id=id;
            this.bankingEntity = bankingEntity;
            this.titularName = titularName;
            this.cardNumber =cardNumber;
            this.expirationDate = expirationDate;
            this.cvv = cvv;
            this.state = state;
            this.idPerson = idPerson;

    }
}
