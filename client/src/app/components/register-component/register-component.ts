import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User} from '../../models/user.model';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-register-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})

export class RegisterComponent {
  user: User = { username: '', password: '', fullName: '', email: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.user.username || !this.user.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (res) => {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error.message || 'Registration failed.';
      }
    });
  }
}
