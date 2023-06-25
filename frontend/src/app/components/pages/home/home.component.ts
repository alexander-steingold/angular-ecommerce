import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../../services/item.service";
import {Item} from "../../../shared/models/Item";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items?: Item[];

  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['term']) {
        this.items = this.itemService.getItemBySearch(params['term']);
      } else if (params['tag']) {
        this.items = this.itemService.getItemByTag(params['tag']);
      } else {
        this.items = this.itemService.getAll();
      }
    });
  }
}
