import { Component, OnInit, Input } from '@angular/core';
import { fetchApiData } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movieDetails: any = {};

  movies: any[] = [];
  user: any = '';
  favorites: any [] = JSON.parse(localStorage.getItem('user_favorites') || '[]');

  constructor(
    public fetchApiData: fetchApiData,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.user = localStorage.getItem('user');
    console.log(this.favorites);
  }

  getMovies(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to view movies');
      this.router.navigate(['']);
    }
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  showGenreDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: 
        movie,
    });
  }
}
