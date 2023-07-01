import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Favorite} from "../shared/models/Favorite";
import {Item} from "../shared/models/Item";
import {CartItem} from "../shared/models/CartItem";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteItems: Favorite = this.getFavoriteFromLocalStorage();
  private favoriteSubject: BehaviorSubject<Favorite> = new BehaviorSubject(this.favoriteItems);

  constructor() {
  }

  getFavoriteObservable(): Observable<Favorite> {
    return this.favoriteSubject.asObservable();
  }

  addToFavorite(item: Item | undefined): void {
    let favoriteItem = this.isFavoriteItem(item);
    if (!favoriteItem) {
      if (item) {
        this.favoriteItems.items.push(item);
        this.setFavoriteToLocalStorage();
      }
    }
  }

  isFavoriteItem(item: Item | undefined): boolean {
    if (this.favoriteItems.items.find(i => i.id === item.id))
      return true;
    return false;
  }

  removeFromFavorite(item: Item | undefined): void {
    this.favoriteItems.items = this.favoriteItems.items.filter(i => i.id != item.id);
    this.setFavoriteToLocalStorage();
  }


  private setFavoriteToLocalStorage(): void {
    localStorage.setItem('Favorite', JSON.stringify(this.favoriteItems));
    this.favoriteSubject.next(this.favoriteItems); //notify all subscribers and listeners
  }

  private getFavoriteFromLocalStorage(): Favorite {
    let items = JSON.parse(localStorage.getItem('Favorite'));
    return items ? items : new Favorite();
  }
}
