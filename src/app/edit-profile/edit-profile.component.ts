import { Component, OnInit, Input } from '@angular/core';
import { fetchApiData } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: fetchApiData,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  updateUser(): void {
    const sourceUser = localStorage.getItem('user');
    this.fetchApiData.updateUser(sourceUser, this.userData).subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.snackBar.open('Username Updated', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', this.userData.Username);
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
