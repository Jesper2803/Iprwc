export class Product {

  public id: string;
  public productName: string;
  public category: string;
  public amount: number;
  public price: number;
  public imagePath: string;

  constructor(id: string, productName: string, category: string, amount: number, price: number, imagePath: string){
    this.id = id;
    this.productName = productName;
    this.category = category;
    this.amount = amount;
    this.price = price;
    this.imagePath = imagePath;
  }

}
