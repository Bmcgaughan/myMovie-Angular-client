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
  /** @constructor */
  constructor(public dialog: MatDialog, public router: Router) {}
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['movies']);
    }
  }

  /**
   * This function is used to open the user registration dialog
   * @function openUserRegistration
   */

  openUserRegistration(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '380px',
      height: '320px',
    });
  }

  /**
   * This function is used to open the user login dialog
   * @function openUserLogin
   */

  openUserLogin(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '380px',
      height: '320px',
    });
  }
}
