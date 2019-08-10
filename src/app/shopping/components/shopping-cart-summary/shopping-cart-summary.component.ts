import { ShoppingCart } from 'shared/models/app-shopping-cart';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {

  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor() {}

}
