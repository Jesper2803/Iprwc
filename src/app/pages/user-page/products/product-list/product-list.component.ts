import {Component} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../../services/product.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  // @ts-ignore
  products: Product[];
  category: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
      if (this.category == null){
        this.productService.getAllProducts().subscribe(
          (objectArray: Object[]) => {
            this.products = objectArray as [Product];
            this.products.forEach((a:any)=>{
              Object.assign(a,{quantiy:1, total:a.price});
            })
          }
        )
      }else {
        console.log(this.category)
        this.productService.getProductByCategory(this.category).subscribe(
          (objectArray: Object[]) => {
            this.products = objectArray as [Product];
            this.products.forEach((a:any)=>{
              Object.assign(a,{quantity:1, total:a.price});
            })
          });
      }
    });


    // this.products = this.productService.getProducts();
  }

}
