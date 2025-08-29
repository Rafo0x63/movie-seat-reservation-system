import {Component, EventEmitter, Output} from '@angular/core';
import { Theater } from '../../models/theater.model';
import { Movie } from '../../models/movie.model';
import {TheaterService} from '../../services/theater-service';
import {MovieService} from '../../services/movie-service';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-selector-component',
  imports: [FormsModule],
  templateUrl: './selector-component.html',
  styleUrl: './selector-component.css'
})
export class SelectorComponent {
  theaters: Theater[] = [];
  movies: Movie[] = [];

  selectedTheater: Theater | null = null;
  selectedMovie: Movie | null = null;

  @Output() theaterChange: EventEmitter<any> = new EventEmitter();
  @Output() movieChange: EventEmitter<any> = new EventEmitter();

  constructor(private theaterService: TheaterService, private movieService: MovieService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.movieService.getAllMovies().subscribe({
      next: data => {
        this.movies = data;
      },
      error: err => {
        console.log(err);
      }
    });

    this.theaterService.getAllTheaters().subscribe({
      next: data => {
        this.theaters = data;
        const slug = this.route.snapshot.paramMap.get('theaterSlug');
        if (slug) {
          this.selectedTheater = this.theaters.find(
            t => t.name.toLowerCase().replace(/\s+/g, '-') === slug
          ) || null;
        }
      },
      error: err => {
        console.log(err);
      }
    });

    if (this.selectedTheater) {
      this.theaterChange.emit(this.selectedTheater);
    }
    if (this.selectedMovie) {
      this.movieChange.emit(this.selectedMovie);
    }
  }

  onTheaterChange(theater: Theater) {
    this.selectedTheater = theater;
    if (this.selectedTheater) {
      this.router.navigate([`/${this.selectedTheater.slug}`]);
    }
  }

  onMovieChange(movie: Movie) {
    this.selectedMovie = movie;
  }
}
