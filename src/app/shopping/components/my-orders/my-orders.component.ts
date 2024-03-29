import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.orders$ = this.authService.user$.switchMap(user => this.orderService.getOrderByUser(user.uid));
  }

}
