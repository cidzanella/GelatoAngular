import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Gelato App';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    //try to get user from localstorage and if exists set as current user
    var localUser = localStorage.getItem('user');

    if (localUser !== null) {
      const user: User = JSON.parse(localUser);
      this.authService.setCurrentUser(user);
    } 
  }

}
