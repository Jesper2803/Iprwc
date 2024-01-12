import {Component} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  // @ts-ignore
  products: Product[];
  category: string;
  allProducts: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
      if (this.category == null){
        this.allProducts = true;
        this.productService.getAllProducts().subscribe(
          (objectArray: Object[]) => {
            this.products = objectArray as [Product];
          }
        )
      }else {
        this.allProducts = false
        this.productService.getProductByCategory(this.category).subscribe(
          (objectArray: Object[]) => {
            this.products = objectArray as [Product];
          });
      }
    });
  }


  selectProduct(product: Product) {
    this.productService.setSelectedProduct(product)
  }
}
