import { Component } from '@angular/core';
import {Order} from "../../../shared/models/order.model";
import {Router} from "@angular/router";
import {OrderService} from "../../../services/order.service";
import {Product} from "../../../shared/models/product.model";
import {OrderItem} from "../../../shared/models/orderitem.model";

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent {

  orders: Order[] = [];
  orderItems: OrderItem[] = [];
  expandedRows: Set<any> = new Set();


  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
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
