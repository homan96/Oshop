import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';
import { Product } from 'shared/models/app-product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'shared/models/app-shopping-cart';

@Injectable()
export class ShoppingCartService {
  
  constructor(private db: AngularFireDatabase) { }
  
  async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).map(cart => new ShoppingCart(cart.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }
  
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, quantity: number) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let ammount = (item.quantity || 0) + quantity;
      if(ammount === 0) item$.remove();
      else 
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price, 
          quantity: ammount
        });
    });
  }
}
