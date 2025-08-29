import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TheaterService } from '../../services/theater-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater-component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./add-theater-component.css']
})
export class AddTheaterComponent {
  theaterForm: FormGroup;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private theaterService: TheaterService,
    private router: Router
  ) {
    this.theaterForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      slug: ['', Validators.required],
      rows: [5, [Validators.required, Validators.min(1)]],
      seatsPerRow: [10, [Validators.required, Validators.min(1)]],
    });
  }

  submit() {
    if (this.theaterForm.invalid) return;

    this.submitting = true;
    this.error = '';

    this.theaterService.addTheater(this.theaterForm.value).subscribe({
      next: (res) => {
        this.submitting = false;
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        this.submitting = false;
        this.error = err.error?.message || 'Failed to create theater';
      }
    });
  }
}
