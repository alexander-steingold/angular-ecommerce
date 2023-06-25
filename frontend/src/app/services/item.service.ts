import {Injectable} from '@angular/core';
import {Item} from "../shared/models/Item";
import {sample_foods, sample_tags} from "../../data";
import {Tag} from "../shared/models/Tag";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() {
  }

  getAll(): Item[] {
    return sample_foods;
  }

  getItemBySearch(term: string): Item[] {
    return this.getAll().filter(food => food.name?.toLowerCase().includes(term.toLowerCase()));
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getItemByTag(tag: string): Item[] {
    const allFoods = this.getAll();
    return tag === 'All' ? allFoods : allFoods.filter(food => food.tags?.includes(tag));
  }

  getItemById(id: string): Item | undefined {
    return this.getAll().find(food => food.id == id) ?? undefined;
  }
}
