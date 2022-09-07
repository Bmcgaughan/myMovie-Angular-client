import { Component, OnInit } from '@angular/core';

import { fetchApiData } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: fetchApiData,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUserInfo(user).subscribe((resp: any) => {
      this.user = resp;
      return this.user;
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
