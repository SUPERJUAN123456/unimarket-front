import { ImageDto } from "./image-dto";

export class ProductGetDTO {

  id:number = 0;
  deadline:Date = new Date();
  title:string = "";
  puntuation:number = 0;
  description:string = "";
  unities:number = 0;
  realPrice:number = 0;
  price:number = 0;
  idCategory:number = 0;
  discount:number = 0;
  stateProduct:number = 0;
  creationDate:Date = new Date();
  images: ImageDto[] = [];
  idPerson: string = "";

  constructor(id: number, deadline: Date, title: string, puntuation: number, description: string, unities: number, realPrice: number, price: number, idCategory: number, discount: number, stateProduct: number, creationDate: Date, images: ImageDto[], idPerson:string) {
    this.id = id;
    this.deadline = deadline;
    this.title = title;
    this.puntuation = puntuation;
    this.description = description;
    this.unities = unities;
    this.realPrice = realPrice;
    this.price = price;
    this.idPerson = idPerson;
    this.idCategory = idCategory;
    this.discount = discount;
    this.stateProduct = stateProduct;
    this.creationDate = creationDate;
    this.images = images;
  }

}
