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
  breakpoint: number = 4;
  rowHeight: string = '500px';

  /** @constructor */
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
    if (window.innerWidth <= 400) {
      this.breakpoint = 1;
      this.rowHeight = '350px';
    } else if (window.innerWidth <= 700) {
      this.breakpoint = 2;
      this.rowHeight = '400px';
    } else if (window.innerWidth <= 1000) {
      this.breakpoint = 4;
      this.rowHeight = '500px';
    }
  }

  /**
   * Used to re-scale the grid of movies when the screen size changes
   * @param event
   * @returns void
   */

  onResize(event: any) {
    if (event.target.innerWidth <= 430) {
      this.breakpoint = 1;
      this.rowHeight = '300px';
    } else if (event.target.innerWidth <= 770) {
      this.breakpoint = 3;
      this.rowHeight = '350px';
    } else if (event.target.innerWidth >= 1000) {
      this.breakpoint = 4;
      this.rowHeight = '500px';
    }
  }

  /**
   * This function gets all the movies from the database
   * @function getMovies
   * @returns void
   */

  getMovies(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to view movies');
      this.router.navigate(['']);
    }
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.myService.data = resp;
      return this.movies;
    });
  }
}
