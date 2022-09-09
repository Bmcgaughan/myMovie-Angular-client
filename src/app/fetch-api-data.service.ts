import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://whatdoiwatch.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class fetchApiData {
  constructor(private http: HttpClient) {}

  //API call to register a new user
  /**
   * @service POST to an API endpoint to register a new user
   * @param {any} userData
   * @returns a new user object in json format
   * @function userRegistration
   */

  public userRegistration(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError));
  }

  //API call to login a user
  /**
   * @service POST to an API endpoint to login a user
   * @param {any} userData
   * @returns a user object in json format
   * @function userLogin
   * @returns
   */

  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  //API Endpoint for getting All Movies
  /**
   * @service GET to an API endpoint to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  //API Endpoint for getting Movie by Title
  /**
   * @service GET to an API endpoint to get a movie by title
   * @param {string} title
   * @returns a an array of movie objects in json format
   * @function getMovieByTitle
   */

  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  //API Endpoint to get specific user Info
  /**
   * @service GET to an API endpoint to get a specific user
   * @param {string} userName
   * @returns a user object in json format
   * @function getUser
   */

  getUserInfo(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  //API Endpoint to add favorite movie to user's list
  /**
   * @service POST to an API endpoint to add a movie to a user's favorites list
   * @param {string} userName
   * @param {string} id
   * @returns a user object in json format
   * @function addFavorite
   */

  addFavorite(userName: any, id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + `users/${userName}/favorites/${id}`, null, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  //API Endpoint to remove favorite movie from user's list
  /**
   * @service DELETE to an API endpoint to remove a movie from a user's favorites list
   * @param {string} userName
   * @param {string} id
   * @returns a user object in json format
   * @function addFavorite
   */
  removeFavorite(userName: any, id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${userName}/favorites/${id}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  //API Endpoint to update user Details
  /**
   * @service PUT to an API endpoint to update a user's details
   * @param {string} userName
   * @param {any} userData
   * @returns a user object in json format
   * @function editUser
   */
  updateUser(userName: any, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(userName, userData);
    return this.http
      .put(apiUrl + `users/${userName}`, userData, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(this.handleError));
  }

  //API Endpoint to delete a user
  /**
   * @service DELETE to an API endpoint to delete a user
   * @param {string} userName
   * @returns success message
   * @function deleteUser
   */
  
  deleteUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${userName}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, Error body ${error.error}`
      );
    }

    return throwError(() => {
      return error.error;
      // new Error('Something bad happened; please try again later.');
    });
  }
}
