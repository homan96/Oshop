import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from 'shared/models/app-order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping = {}; 
  userId: string;
  subscription: Subscription;
  @Input('cart') cart;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.saveOrder(order);
    if(result) {
      this.router.navigate(['/order-success', result.key]);
    }
  }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
