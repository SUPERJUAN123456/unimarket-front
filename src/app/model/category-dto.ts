export class CategoryDTO {
  

  id:number = 0;
  name:string = "";
  url_image:string = "";

  constructor(id: number, name: string, url_image: string) {
    this.id = id;
    this.name = name;
    this.url_image = url_image;
  }
}
