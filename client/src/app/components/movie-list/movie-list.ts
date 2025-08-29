import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import {MovieService} from '../../services/movie-service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieList {
  @Input() movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAllMovies().subscribe({
      next: data => {
        this.movies = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
