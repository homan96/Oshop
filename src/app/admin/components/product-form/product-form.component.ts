import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  productId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
    this.categories$ = categoryService.getAll();
    this.productId = this.route.snapshot.paramMap.get('id');
    if(this.productId)
      this.product = this.productService.get(this.productId).take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {

  }

  save(product) {
    if(this.productId) this.productService.update(this.productId, product);
    else this.productService.create(product);

    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if(!confirm("Are you sure you want to delete this product ?")) return;
    this.productService.delete(this.productId);

    this.router.navigate(["/admin/products"]);
  }

}
