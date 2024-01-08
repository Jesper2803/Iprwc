export class CartItem {

  public productId: string;
  public productName: string;
  public price: number;
  public imagePath: string;
  public quantity: number;

  constructor(productId: string, productName: string, price: number, imagePath: string, quantity: number){
    this.productId = productId;
    this.productName = productName;
    this.price = price;
    this.imagePath = imagePath;
    this.quantity = quantity;
  }

}
