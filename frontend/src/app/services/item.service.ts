import {Injectable} from '@angular/core';
import {Item} from "../shared/models/Item";
import {sample_foods, sample_tags} from "../../data";
import {Tag} from "../shared/models/Tag";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ITEMS_BY_IS_URL,
  ITEMS_BY_SEARCH_URL,
  ITEMS_BY_TAG_URL,
  ITEMS_TAGS_URL,
  ITEMS_URL
} from "../shared/constants/urls";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(ITEMS_URL);
  }

  getItemBySearch(term: string): Observable<Item[]> {
    return this.http.get<Item[]>(ITEMS_BY_SEARCH_URL + term);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(ITEMS_TAGS_URL);
  }

  getItemByTag(tag: string): Observable<Item[]> {
    return tag === 'All' ? this.getAll() : this.http.get<Item[]>(ITEMS_BY_TAG_URL + tag);
    ;
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(ITEMS_BY_IS_URL + id);
  }
}
