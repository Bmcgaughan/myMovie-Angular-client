import { Component, OnInit, Output } from '@angular/core';

import { fetchApiData } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MyService } from 'src/service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  movies: any[] = [];
  user: any = '';
  favorites: any[] = JSON.parse(localStorage.getItem('user_favorites') || '[]');

  constructor(
    public fetchApiData: fetchApiData,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    private myService: MyService
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.user = localStorage.getItem('user');
  }

  getMovies(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to view movies');
      this.router.navigate(['']);
    }
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.myService.data = resp
      return this.movies;
    });
  }
}
