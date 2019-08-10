import { ShoppingCartItem } from './app-shopping-cart-item';
import { Product } from './app-product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    
    constructor(private itemsMap: { [key: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
        }
    }

    getQuantity(product: Product) {
        let item = this.itemsMap[product.$key];
        
        return item ? item.quantity : 0;
    }
    
    get totalPrice() {
        let totalPrice = 0;
        for(let item of this.items) {
            totalPrice += item.totalPrice;
        }
        return totalPrice;
    }
    
    get totalItemsCount() {
        let count = 0;
        for(let productId in this.itemsMap) 
        count += this.itemsMap[productId].quantity;
        return count;
    }
}