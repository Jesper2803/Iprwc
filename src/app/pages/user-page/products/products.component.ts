import {Component, OnInit} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit{
  selectedProduct: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.productSelected.subscribe((product: Product) => {
      this.selectedProduct = product;
    })
  }


}
