import { Component } from '@angular/core';
import {MovieService} from '../../services/movie-service';
import {Movie} from '../../models/movie.model';

@Component({
  selector: 'app-manage-movies-component',
  imports: [],
  templateUrl: './manage-movies-component.html',
  styleUrl: './manage-movies-component.css'
})
export class ManageMoviesComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAllMovies().subscribe({
      next: data => {
        this.movies = data;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  deleteMovie(movie: Movie) {
    const confirmed = confirm(`Are you sure you want to delete this movie?\n
    ${movie.title}`);
    if (confirmed) {
      this.movieService.deleteMovie(movie.id).subscribe({
        next: () => {
          alert('The movie has been deleted');

          this.movies = this.movies.filter(m => m.id !== movie.id);
        },
        error: err => {
          console.error(err);
          alert("Something went wrong!");
        }
      });
    }
  }
}
