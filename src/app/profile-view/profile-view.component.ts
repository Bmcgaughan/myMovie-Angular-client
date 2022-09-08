import { Component, OnInit, Input } from '@angular/core';

import { fetchApiData } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MyService } from 'src/service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  userFavorites: any = [];

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

  deleteUser(): void {
    if (
      confirm(
        'Are you sure you want to delete your profile? Data cannot be recovered...'
      )
    ) {
      const user = localStorage.getItem('user');
      this.fetchApiData.deleteUser(user).subscribe((resp: any) => {
        this.snackBar.open('Account Deleted', 'OK', {
          duration: 2000,
        });
        localStorage.clear();
        this.router.navigate(['']);
      });
    }
  }
}
