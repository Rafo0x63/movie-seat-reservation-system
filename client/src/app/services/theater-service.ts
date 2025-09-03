import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Theater} from '../models/theater.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  private apiUrl = 'http://localhost:6500/api/theaters';

  constructor(private http: HttpClient) {}

  getAllTheaters(): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${this.apiUrl}`);
  }

  getTheaterBySlug(slug: string): Observable<Theater> {
    return this.http.get<Theater>(`${this.apiUrl}/${slug}`);
  }

  addTheater(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteTheater(theaterId: number) {
    return this.http.delete(`${this.apiUrl}/${theaterId}`);
  }
}
