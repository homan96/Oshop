import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/app-product';
import { ShoppingCart } from 'shared/models/app-shopping-cart';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
    
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }
  private populateProducts() {
    this.productService.getAll().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }).subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
  }
}
