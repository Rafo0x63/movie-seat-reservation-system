import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Movie} from '../models/movie.model';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:6500/api/movies';

  constructor(private http: HttpClient) {}

  searchMovies(title: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search?title=${title}`);
  }

  getMovieByImdbId(imdbId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/search/${imdbId}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}`, movie);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteMovie(movieId: number) {
    return this.http.delete<any>(`${this.apiUrl}/${movieId}`);
  }
}
