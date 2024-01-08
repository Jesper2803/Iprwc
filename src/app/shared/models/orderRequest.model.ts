import {OrderItemRequest} from "./orderItemRequest.model";

export class OrderRequest {

  userId: string;
  totalPrice: number;
  orderItems: OrderItemRequest[];


}
