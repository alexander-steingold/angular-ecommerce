import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../shared/models/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  user!: User;

  constructor(private cartService: CartService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cartQuantity = cart.totalCount;
    })

    this.userService.userObservable.subscribe(user => {
      this.user = user;
    })
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
