import {Component, OnInit} from '@angular/core';
import {Item} from "../../../shared/models/Item";
import {ItemService} from "../../../services/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  item?: Item;

  constructor(private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.item = this.itemService.getItemById(params['id']);
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.item);
    this.router.navigateByUrl('/cart-page');
  }
}
