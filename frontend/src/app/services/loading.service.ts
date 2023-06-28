import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // isLoadingSubject => inform all user classes in state of loading
  private isLoadingSubject = new BehaviorSubject<boolean>(false)

  constructor() {
  }

  showLoading() {
    this.isLoadingSubject.next(true);
  }

  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  // asObservable() => protect that nobody outside the class can access and change the loading state
  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
