import {Component, OnInit} from '@angular/core';
import {Tag} from "../../../shared/models/Tag";
import {ItemService} from "../../../services/item.service";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?: Tag[];

  constructor(private foodService: ItemService) {
  }

  ngOnInit(): void {
    this.foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags
    });
  }
}
