import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ScheduleService } from '../../services/schedule-service';
import { MovieService } from '../../services/movie-service';
import { TheaterService } from '../../services/theater-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules-component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./manage-schedules-component.css']
})
export class ManageSchedulesComponent implements OnInit {
  scheduleForm: FormGroup;
  movies: any[] = [];
  theaters: any[] = [];
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private movieService: MovieService,
    private theaterService: TheaterService,
    private router: Router
  ) {
    this.scheduleForm = this.fb.group({
      movieId: [null, Validators.required],
      theaterId: [null, Validators.required],
      startTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMovies();
    this.loadTheaters();
  }

  loadMovies() {
    this.movieService.getAllMovies().subscribe((res) => {
      this.movies = res;
    });
  }

  loadTheaters() {
    this.theaterService.getAllTheaters().subscribe((res) => {
      this.theaters = res;
    });
  }

  submit() {
    if (this.scheduleForm.invalid) return;

    this.submitting = true;
    this.error = '';

    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe({
      next: (res) => {
        this.submitting = false;
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        this.submitting = false;
        this.error = err.error?.message || 'Failed to create schedule';
      }
    });
  }
}
