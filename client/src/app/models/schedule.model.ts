import {Movie} from './movie.model';
import {Theater} from './theater.model';
import {SeatReservation} from './seat-reservation.model';

export interface Schedule {
  id: number;
  movie: Movie;
  theater: Theater;
  startTime: Date;
  seatReservations: SeatReservation[];
}
