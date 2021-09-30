import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseURL = environment.apiURL;
  
  //observable to store user
  private currentUserSource = new ReplaySubject<User>(1); //replaysubject is a type of observable, kind of buffer
  currentUser$ = this.currentUserSource.asObservable(); //observable

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.currentUserSource.next(undefined); //or null!
   }

  login(model: any) {
    return this.http.post(this.baseURL + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response as User;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user; //optional: returning just to show how could be done
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  getCurrentUser() {
    return this.currentUser$.pipe (
      map((user: User) => {
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined); //or null!
  }
}
