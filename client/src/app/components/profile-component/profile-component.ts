import { Component } from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {StoreService} from '../../services/store-service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile-component',
  imports: [DatePipe],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent {
  user: any = null;
  receipts: any = [];
  loading = true;

  constructor(private storeService: StoreService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.authService.getUserInfo().subscribe({
      next: data => {
        this.user = data;
        this.loadPurchases();
      }
    })
  }

  loadPurchases() {
    this.storeService.getUserPurchases(this.user.id).subscribe(tickets => {
      const grouped: { [key: number]: any } = {};

      tickets.forEach((ticket: { receipt: { id: any; totalPrice: any; paymentMethod: any; paidAt: any; }; id: any; price: any; seatReservation: { seat: any; schedule: any; }; }) => {
        const receiptId = ticket.receipt.id;

        if (!grouped[receiptId]) {
          grouped[receiptId] = {
            id: ticket.receipt.id,
            totalPrice: Number(ticket.receipt.totalPrice),
            paymentMethod: ticket.receipt.paymentMethod,
            paidAt: ticket.receipt.paidAt,
            tickets: []
          };
        }

        grouped[receiptId].tickets.push({
          id: ticket.id,
          price: Number(ticket.price),
          seatReservation: {
            seat: ticket.seatReservation.seat,
            schedule: ticket.seatReservation.schedule
          }
        });
      });

      this.receipts = Object.values(grouped);
      this.loading = false;
    });
  }

  getSeatsText(tickets: any[]): string {
    return tickets
      .map(t => t.seatReservation.seat.rowLetter + t.seatReservation.seat.seatNumber)
      .join(', ');
  }
}
