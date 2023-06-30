import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../../shared/models/Order";

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {
  order!: Order;

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (!params.orderId) return;
    this.orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order
    });
  }

}
