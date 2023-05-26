import { ImageDto } from "./image-dto";

export class ProductDTO {

  title:string = "";
  description:string = "";
  unities:number = 0;
  realPrice:number = 0;
  idCategory:number = 0;
  discount:number = 0;
  images: ImageDto[] = [];
  idPerson: string = "";

  constructor(){

  }


}
