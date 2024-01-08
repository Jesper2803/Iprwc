import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../../shared/models/product.model";
import {ProductService} from "../../../../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input()
  product!: Product;


  ngOnInit(){

  }

}
