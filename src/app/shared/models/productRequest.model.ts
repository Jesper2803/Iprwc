export class ProductRequest {

  public productName: string;
  public category: string;
  public amount: number;
  public price: number;
  public imagePath: string;

  constructor(productName: string, category: string, amount: number, price: number, imagePath: string){
    this.productName = productName;
    this.category = category;
    this.amount = amount;
    this.price = price;
    this.imagePath = imagePath;
  }

}
