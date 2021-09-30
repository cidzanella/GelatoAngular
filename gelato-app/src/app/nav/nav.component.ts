import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model: any = {};
  loggedUser: User | undefined;
  loggedUsername: string | undefined;
  isCollapsed: boolean = false;
  
  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
     this.getCurrentUsername();
  }

  login() {
    this.authService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/gelato-display');
      //this.loggedUsername = response.userName;
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }


  getCurrentUsername() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) this.loggedUsername = user.userName.toUpperCase();
    });

    // this.authService.currentUser$.subscribe(user => {
    //   this.loggedUsername = user.userName.toUpperCase();
    // }, error => {
    //   console.log(error);
    // })
  }

}
