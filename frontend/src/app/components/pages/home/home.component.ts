import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../../services/item.service";
import {Item} from "../../../shared/models/Item";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let itemObservable: Observable<Item[]>;
    this.activatedRoute.params.subscribe(params => {
      if (params['term']) {
        itemObservable = this.itemService.getItemBySearch(params['term']);
      } else if (params['tag']) {
        itemObservable = this.itemService.getItemByTag(params['tag']);
      } else {
        itemObservable = this.itemService.getAll();
      }
      itemObservable.subscribe(serverItems => {
        this.items = serverItems;
      });
    });
  }
}
