import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/app-shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) { 
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
