import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:6500/api/schedules';

  constructor(private http: HttpClient) { }

  getScheduleById(scheduleId: number) {
    return this.http.get(`${this.apiUrl}/${scheduleId}`);
  }

  lockSeatForReservation(scheduleId: number, seatId: number, userId: number) {
    return this.http.post(`${this.apiUrl}/${scheduleId}/lock-seat`, { seatId: seatId, userId });
  }

  unlockSeat(scheduleId: number, seatId: number, userId: number) {
    return this.http.post(`${this.apiUrl}/${scheduleId}/unlock-seat`, { seatId: seatId, userId });
  }

  createSchedule(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }
}
