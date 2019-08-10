import { ShoppingCart } from './app-shopping-cart';

export class Order {
    placedDate: number;
    items: any[];
    
    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.placedDate = new Date().getTime();
        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        });
    }
}