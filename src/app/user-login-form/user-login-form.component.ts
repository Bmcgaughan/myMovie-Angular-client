import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { fetchApiData } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /** @constructor */
  constructor(
    public fetchApiData: fetchApiData,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {

  }

  /**
   * This is the function responsible for sending the form inputs to the backend
   * @function loginUser
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.snackBar.open('User logged in successfully', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', data.user.Username);
        localStorage.setItem('user_favorites', JSON.stringify(data.user.FavoriteMovies));
        localStorage.setItem('token', data.token);
        this.router.navigate(['movies']);

      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Login Failed - please check Username and/or Password', 'OK', {

        });
      },
    });
  }

}
