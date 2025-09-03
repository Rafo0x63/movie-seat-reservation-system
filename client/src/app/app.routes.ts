import { Routes } from '@angular/router';
import { TheaterList } from './components/theater-list/theater-list';
import { AddMovie } from './components/add-movie/add-movie';
import { MovieList } from './components/movie-list/movie-list';
import { TheaterComponent } from './components/theater-component/theater-component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection';
import { RegisterComponent } from './components/register-component/register-component';
import { LoginComponent } from './components/login-component/login-component';
import { AdminDashboardComponent } from './components/admin-dashboard-component/admin-dashboard-component';
import { AddTheaterComponent } from './components/add-theater-component/add-theater-component';
import { ManageSchedulesComponent } from './components/manage-schedules-component/manage-schedules-component';
import { ProfileComponent } from './components/profile-component/profile-component';
import { AuthGuard } from './guards/auth-guard';
import { Home } from './components/home/home';
import { ManageMoviesComponent } from './components/manage-movies-component/manage-movies-component';
import { ManageTheatersComponent } from './components/manage-theaters-component/manage-theaters-component';
import { ManageUsersComponent } from './components/manage-users-component/manage-users-component';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: 'theaters', component: TheaterList, canActivate: [AuthGuard] },
  { path: 'add-movie', component: AddMovie, canActivate: [AuthGuard] },
  { path: 'movies', component: MovieList, canActivate: [AuthGuard] },
  { path: 'seat-selection/:scheduleId', component: SeatSelectionComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-theater', component: AddTheaterComponent, canActivate: [AuthGuard] },
  { path: 'manage-schedules', component: ManageSchedulesComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'manage-movies', component: ManageMoviesComponent, canActivate: [AuthGuard] },
  { path: 'manage-theaters', component: ManageTheatersComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: ':theaterSlug', component: TheaterComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', canActivate: [AuthGuard] },
];
