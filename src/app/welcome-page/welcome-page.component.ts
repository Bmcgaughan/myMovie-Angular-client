import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router) {}
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['movies']);
    }
  }
  openUserRegistration(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  openUserLogin(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
