import { Component } from '@angular/core';
import {MovieService} from '../../services/movie-service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-add-movie',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css'
})
export class AddMovie {
  searchTitle = '';
  movies: Movie[] = [];
  loading = false;
  selectedMovie: Movie | null = null;

  constructor(private movieService: MovieService) {}

  searchMovies() {
    if (!this.searchTitle.trim()) return;

    this.movies = [];
    this.loading = true;

    this.movieService.searchMovies(this.searchTitle).subscribe({
      next: (data) => {
        this.movies = data;
        this.movies.sort((a: Movie, b: Movie) => { return a.year < b.year ? 1 : -1 });
        console.log(this.movies);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching movies', error);
        this.loading = false;
      }
    });
  }

  removeMovie(imdbID: string) {
    this.movies = this.movies.filter(m => m.imdbId !== imdbID);
  }

  showDetails(index: number) {
    this.loading = true;

    this.movieService.getMovieByImdbId(this.movies[index].imdbId).subscribe({
      next: (data) => {
        this.selectedMovie = data;
        this.loading = false;
        console.log(this.selectedMovie)
      },
      error: (error) => {
        console.error('Error showing details', error);
        this.loading = false;
      }
    });
  }

  closeModal() {
    this.selectedMovie = null;
  }

  addMovie() {
    if (this.selectedMovie) {
      this.movieService.addMovie(this.selectedMovie).subscribe({
        next: () => {
          alert("Movie added successfully!");
        },
        error: (err) => {
          if (err.error) {
            alert("Error: " + err.error.message);
          } else alert("Something went wrong!");
        }
      });
    }
  }
}
