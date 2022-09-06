import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myMovie-Angular-client';

  constructor(public dialog: MatDialog) {}

  openUserRegistration(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '500px',
    });
  }

  openUserLogin(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '500px',
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
