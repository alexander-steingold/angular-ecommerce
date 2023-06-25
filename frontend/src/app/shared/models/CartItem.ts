import {Item} from "./Item";

export class CartItem {
  constructor(public item: Item | undefined) {
  } //same as below commented code

  // constructor(private item: Item) {
  //   this.item = item;
  // }

  // item: Item;
  quantity: number = 1;
  price: number = this.item.price;
}
