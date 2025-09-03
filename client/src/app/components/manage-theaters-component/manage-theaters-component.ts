import { Component } from '@angular/core';
import {TheaterService} from '../../services/theater-service';
import {Theater} from '../../models/theater.model';

@Component({
  selector: 'app-manage-theaters-component',
  imports: [],
  templateUrl: './manage-theaters-component.html',
  styleUrl: './manage-theaters-component.css'
})
export class ManageTheatersComponent {
  theaters: Theater[] = [];
  error: string = '';

  constructor(private theaterService: TheaterService) {}

  ngOnInit() {
    this.theaterService.getAllTheaters().subscribe({
      next: data => {
        this.theaters = data;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load Theaters';
      }
    });
  }

  deleteTheater(theaterId: number) {
    const confirmed = confirm('Are you sure you want to delete theater?');

    if (confirmed) {
      this.theaterService.deleteTheater(theaterId).subscribe({
        next: () => {
          this.theaters = this.theaters.filter(t => t.id !== theaterId);
          alert('Theater has been deleted successfully.');
        },
        error: (err: any) => {
          console.error(err);
          alert('Failed to delete theater');
        }
      });
    }
  }
}
