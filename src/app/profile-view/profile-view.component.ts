import { Component, OnInit, Input } from '@angular/core';

import { fetchApiData } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MyService } from 'src/service';

import { Router } from '@angular/router';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  userFavorites: any = [];
  breakpoint: number = 4;
  rowHeight: string = '500px';

  //grabbing movies from service which is populated by the main view component
  allMovies = this.mysrvc.data;

  constructor(
    public fetchApiData: fetchApiData,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
    private mysrvc: MyService
  ) {}

  ngOnInit(): void {
    if (!this.allMovies || this.allMovies.length == 0) {
      this.router.navigate(['movies']);
    }
    this.loadUser();
    this.populateFavorites();
    if (window.innerWidth <= 400) {
      this.breakpoint = 1;
      this.rowHeight = '300px';
    } else if (window.innerWidth <= 700) {
      this.breakpoint = 2;
      this.rowHeight = '400px';
    } else if (window.innerWidth <= 1000) {
      this.breakpoint = 4;
      this.rowHeight = '500px';
    }
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 430) {
      this.breakpoint = 2;
      this.rowHeight = '300px';
    } else if (event.target.innerWidth <= 770) {
      this.breakpoint = 3;
      this.rowHeight = '350px';
    } else if (event.target.innerWidth >= 1000) {
      this.breakpoint = 4;
      this.rowHeight = '500px';
    }
  }

  loadUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUserInfo(user).subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    });
  }

  populateFavorites(): void {
    let userData = localStorage.getItem('user_favorites');
    this.allMovies.forEach((movie: any) => {
      if (userData?.includes(movie._id)) {
        this.userFavorites.push(movie);
      }
    });
  }

  editProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '400px',
    });
  }

  deleteUser(): void {
    if (
      confirm(
        'Are you sure you want to delete your profile? Data cannot be recovered...'
      )
    ) {
      const user = localStorage.getItem('user');
      this.fetchApiData.deleteUser(user).subscribe({
        next: (data) => {
          this.snackBar.open('Account Deleted', 'OK', {
            duration: 2000,
          });
          localStorage.clear();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('Something went wrong...', 'OK', {
            duration: 2000,
          });
        },
      });
    }
  }
}
