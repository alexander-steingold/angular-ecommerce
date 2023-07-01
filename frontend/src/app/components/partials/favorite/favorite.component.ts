import {Component, Input, OnInit} from '@angular/core';
import {FavoriteService} from "../../../services/favorite.service";
import {Favorite} from "../../../shared/models/Favorite";
import {Item} from "../../../shared/models/Item";


@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  isFavorite: boolean = false;
  items!: Favorite;
  @Input() item!: Item;

  constructor(private favoriteService: FavoriteService) {
  }

  ngOnInit(): void {
    this.favoriteService.getFavoriteObservable().subscribe(items => {
      this.items = items;
      this.isFavorite = this.favoriteService.isFavoriteItem(this.item);
    })
  }

  onClick() {
    if (this.isFavorite) {
      this.favoriteService.removeFromFavorite(this.item)
    } else {
      this.favoriteService.addToFavorite(this.item);
    }
    ///this.isFavorite = !this.isFavorite;
  }


}
