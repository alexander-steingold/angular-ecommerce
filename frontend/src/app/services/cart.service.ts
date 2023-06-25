import {Injectable} from '@angular/core';
import {Cart} from "../shared/models/Cart";
import {BehaviorSubject, Observable} from "rxjs";
import {Item} from "../shared/models/Item";
import {CartItem} from "../shared/models/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {
  }

  addToCart(item: Item | undefined): void {
    let cartItem = this.cart.items.find(i => i.item.id === item.id);
    if (!cartItem) {
      cartItem = new CartItem(item);
      this.cart.items.push(cartItem);
      this.setCartToLocalStorage();
    }
    return;

  }
  
  removeFromCart(itemId: string): void {
    this.cart.items = this.cart.items.filter(item => item.item.id != itemId);
    this.setCartToLocalStorage();
  }


  changeQuantity(itemId: string | undefined, quantity: number): void {
    let cartItem = this.cart.items.find(i => i.item.id === itemId);
    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.price = quantity * (cartItem.item.price);
      this.setCartToLocalStorage();
    }
    return;
  }

  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevQnt, currentItem) => prevQnt + currentItem.quantity, 0);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart); //notify all subscribers and listeners
  }


  private getCartFromLocalStorage(): Cart {
    let cart = JSON.parse(localStorage.getItem('Cart'));
    return cart ? cart : new Cart();
  }
}
