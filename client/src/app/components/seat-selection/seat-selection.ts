import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../../services/schedule-service';
import { SeatService } from '../../services/seat-service';
import { AuthService } from '../../services/auth-service';
import {CommonModule, DatePipe} from '@angular/common';
import {StoreService} from '../../services/store-service';

@Component({
  selector: 'app-seat-selection',
  imports: [CommonModule, DatePipe],
  templateUrl: './seat-selection.html',
  styleUrls: ['./seat-selection.css']
})
export class SeatSelectionComponent implements OnInit {
  scheduleId!: number;
  schedule: any;
  seatRows: { rowLetter: string; seats: any[] }[] = [];
  selectedSeats: any[] = [];
  currentUserId!: number;
  LOCK_TIMEOUT = 5 * 60 * 1000;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private seatService: SeatService,
    private authService: AuthService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.scheduleId = +this.route.snapshot.paramMap.get('scheduleId')!;
    this.currentUserId = Number(this.authService.getUserId());
    this.fetchSchedule();
  }

  fetchSchedule() {
    this.scheduleService.getScheduleById(this.scheduleId).subscribe((data) => {
      this.schedule = data;
      this.seatService.getSeatsByTheater(this.schedule.theaterId).subscribe((seats) => {
        this.prepareSeats(seats, this.schedule.seatReservations);
      });
    });
  }

  prepareSeats(seats: any[], seatReservations: any[]) {
    const now = Date.now();
    const reservedMap = new Map<number, any>();
    seatReservations.forEach(res => reservedMap.set(res.seatId, res));

    seats.forEach(seat => {
      const res = reservedMap.get(seat.id);
      if (res) {
        seat.isReserved = res.isReserved;
        seat.lockedAt = res.lockedAt ? new Date(res.lockedAt) : null;
        seat.lockedBy = res.userId || null;
        if (seat.lockedBy == this.currentUserId && !seat.isReserved) {
          this.selectedSeats.push(seat);
        }
      } else {
        seat.isReserved = false;
        seat.lockedAt = null;
        seat.lockedBy = null;
      }

      seat.isLocked = seat.lockedAt && (now - seat.lockedAt.getTime() < this.LOCK_TIMEOUT);
      seat.seatReservationId = res?.id || null;
    });

    const rowsMap = new Map<string, any[]>();
    seats.forEach(seat => {
      if (!rowsMap.has(seat.rowLetter)) rowsMap.set(seat.rowLetter, []);
      rowsMap.get(seat.rowLetter)!.push(seat);
    });

    this.seatRows = Array.from(rowsMap.entries())
      .map(([rowLetter, seats]) => ({
        rowLetter,
        seats: seats.sort((a, b) => a.seatNumber - b.seatNumber)
      }))
      .sort((a, b) => a.rowLetter.localeCompare(b.rowLetter));
  }

  isSelected(seat: any) {
    return this.selectedSeats.some(s => s.id === seat.id);
  }

  toggleSeat(seat: any) {
    if (seat.isReserved) return;

    const userId = this.currentUserId;

    if (seat.isLocked && seat.lockedBy === userId) {
      this.scheduleService.unlockSeat(this.scheduleId, seat.id, userId).subscribe({
        next: () => {
          seat.isLocked = false;
          seat.lockedBy = null;
          this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
        },
        error: err => alert(err.error.message || 'Seat could not be unlocked')
      });
      return;
    }

    if (seat.isLocked && seat.lockedBy !== userId) return;

    this.scheduleService.lockSeatForReservation(this.scheduleId, seat.id, userId).subscribe({
      next: () => {
        seat.isLocked = true;
        seat.lockedBy = userId;
        this.selectedSeats.push(seat);
      },
      error: err => {
        alert(err.error.message || 'Seat could not be locked');
        this.fetchSchedule();
      }
    });
  }

  confirmSeats() {
    const userId = Number(this.authService.getUserId());
    const pricePerSeat = 10;

    const seatReservationIds = this.selectedSeats.map(s => s.seatReservationId);
    this.storeService.purchaseTicket(userId, seatReservationIds, pricePerSeat)
      .subscribe({
        next: (res) => {
          alert('Tickets purchased successfully!');
          this.fetchSchedule();
          this.selectedSeats = [];
        },
        error: err => {
          console.error(err);
          alert(err.error.message || 'Purchase failed');
          this.fetchSchedule();
        }
      });
  }

  get selectedSeatsText(): string {
    return this.selectedSeats.length
      ? this.selectedSeats.map(s => s.rowLetter + s.seatNumber).join(', ')
      : 'None';
  }
}
