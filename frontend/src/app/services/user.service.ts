import {Injectable} from '@angular/core';
import {User} from "../shared/models/User";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IUserLogin} from "../shared/interfaces/IUserLogin";
import {HttpClient} from "@angular/common/http";
import {USER_LOGIN_URL, USER_REGISTER_URL} from "../shared/constants/urls";
import {ToastrService} from "ngx-toastr";
import {IUserRegister} from "../shared/interfaces/IUserRegister";

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  // BehaviorSubject is a generic type of Observable for read and write operations.
  public userObservable: Observable<User>;

  constructor(private http: HttpClient,
              private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable(); //read-only property from the subject of User
  }

  public getCurrentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome ${user.name}`, 'Login Successful');
        },
        error: (err) => {
          this.toastrService.error(err.error, 'Login Failed');
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(tap(
      {
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome ${user.name}`, 'Register Successful');
        },
        error: (err) => {
          this.toastrService.error(err.error, 'Register Failed');
        }
      }
    ))
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? (JSON.parse(userJson) as User) : new User();
  }
}
