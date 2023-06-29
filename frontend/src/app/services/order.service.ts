import {Injectable} from '@angular/core';
import {Order} from "../shared/models/Order";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ORDERS_CREATE_URL} from "../shared/constants/urls";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private toastrService: ToastrService) {
  }

  create(order: Order) {
    return this.http.post<Order>(ORDERS_CREATE_URL, order);
  }
}
