import { Component, OnInit } from '@angular/core';
import { fetchApiData } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = '';

  constructor(public fetchApiData: fetchApiData) {}

  ngOnInit(): void {
    this.getMovies()
    this.user = localStorage.getItem('user');
  }

  getMovies(): void {
    let token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to view movies');
      return;
    }
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
}
