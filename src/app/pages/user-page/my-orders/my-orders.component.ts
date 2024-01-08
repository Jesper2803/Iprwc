import { Component } from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {Order} from "../../../shared/models/order.model";
import {OrderService} from "../../../services/order.service";
import {OrderItem} from "../../../shared/models/orderitem.model";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  orders: Order[] = [];
  orderItems: OrderItem[] = []
  userId: string;
  expandedRows: Set<any> = new Set();



  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.getOrdersByUser();
  }

  public getOrdersByUser() {
    this.userId = <string>localStorage.getItem('userId')
    this.orderService.getUserOrders(this.userId).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      }
    );
  }

  toggleRow(item: any): void {
    if (this.isRowExpanded(item)) {
      this.expandedRows.delete(item);
    } else {
      this.expandedRows.add(item);
    }
  }

  isRowExpanded(item: any): boolean {
    return this.expandedRows.has(item);
  }

}
