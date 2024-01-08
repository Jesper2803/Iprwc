import {OrderItem} from "./orderitem.model";

export class Order {

  orderId: string;
  userId: string;
  totalPrice: number;
  formattedDate: string;
  processed: string;
  orderItems: OrderItem[];


}
