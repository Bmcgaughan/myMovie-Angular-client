import { Component, OnInit, Input } from '@angular/core';
import { fetchApiData } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movieDetails: any = {};
  @Input() movie: any = {};

  user: any = localStorage.getItem('user');
  favorites: any[] = JSON.parse(localStorage.getItem('user_favorites') || '[]');

  constructor(
    public fetchApiData: fetchApiData,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {}

  fontSize(title: string): string {
    if (title.length > 25) {
      return '0.9rem';
    } 
    return '1rem';
  }

  showGenreDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: movie,
    });
  }

  toggleFavorite(movie: any): void {
    if (this.favorites.includes(movie)) {
      this.favorites = this.favorites.filter((item) => item !== movie);
      localStorage.setItem('user_favorites', JSON.stringify(this.favorites));
      this.fetchApiData
        .removeFavorite(this.user, movie)
        .subscribe((resp: any) => {
          this.snackBar.open('Movie Removed from Favorites', 'OK', {
            duration: 2000,
          });
        });
    } else {
      this.favorites.push(movie);
      localStorage.setItem('user_favorites', JSON.stringify(this.favorites));
      this.fetchApiData.addFavorite(this.user, movie).subscribe((resp: any) => {
        this.snackBar.open('Movie Added to Favorites', 'OK', {
          duration: 2000,
        });
      });
    }
  }
}
