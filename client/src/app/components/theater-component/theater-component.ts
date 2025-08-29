import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { SelectorComponent } from '../selector-component/selector-component';
import {TheaterService} from '../../services/theater-service';
import {Theater} from '../../models/theater.model';
import {Movie} from '../../models/movie.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Schedule} from '../../models/schedule.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-theater-component',
  imports: [SelectorComponent, DatePipe],
  templateUrl: './theater-component.html',
  styleUrl: './theater-component.css'
})
export class TheaterComponent implements OnInit {
  theaterSlug!: string | null;
  theater: any;
  moviesWithSchedules: { movie: Movie; schedules: any[] }[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private theaterService: TheaterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.theaterSlug = params.get('theaterSlug');

      if (!this.theaterSlug) return;

      this.theaterService.getTheaterBySlug(this.theaterSlug).subscribe({
        next: data => {
          this.theater = data;

          if (this.theater?.schedules?.length) {
            const map = new Map<number, { movie: any; schedules: any[] }>();

            for (const schedule of this.theater.schedules) {
              const movieId = schedule.movie.id;

              if (!map.has(movieId)) {
                map.set(movieId, {
                  movie: schedule.movie,
                  schedules: [],
                });
              }

              map.get(movieId)!.schedules.push(schedule);
            }

            this.moviesWithSchedules = Array.from(map.values());
          } else {
            this.moviesWithSchedules = [];
          }

          console.log('Grouped:', this.moviesWithSchedules[0].movie.title);
        },
        error: err => {
          console.error(err);
        },
      });
    });
  }

  goToSeatSelection(scheduleId: number) {
    this.router.navigate(['/seat-selection', scheduleId]);
  }
}

