import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost:6500/api/store';

  constructor(private http: HttpClient) {}

  purchaseTicket(userId: number, seatReservationIds: number[], pricePerSeat: number) {
    return this.http.post(`${this.apiUrl}/purchase`, { userId, seatReservationIds, pricePerSeat });
  }

  getUserPurchases(userId: number) {
    return this.http.get<any>(`${this.apiUrl}/purchases/${userId}`);
  }
}
