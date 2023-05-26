export class ImageDto {

    id:string = "";
    url:string = "";

    constructor(publicId: string,url:string){
        this.id = publicId;
        this.url = url;
    }

}
