import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Seat} from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'http://localhost:6500/seats';

  constructor(private http: HttpClient) {}

  getSeatsByTheater(theaterId: string) {
    return this.http.get<Seat[]>(`${this.apiUrl}/theater/${theaterId}`);
  }
}
