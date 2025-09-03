import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user-service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users-component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./manage-users-component.css']
})
export class ManageUsersComponent {

  users: User[] = [];
  adminForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => { this.users = data; this.loading = false; },
      error: (err) => { this.errorMessage = 'Failed to load users'; this.loading = false; }
    });
  }

  deleteUser(userId: any) {
    if(confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.users = this.users.filter(u => u.id !== userId),
        error: () => alert('Failed to delete user')
      });
    }
  }

  addAdmin() {
    if(this.adminForm.invalid) return;
    const { fullName, username, email, password } = this.adminForm.value;
    this.userService.addAdmin({ fullName, username, email, password }).subscribe({
      next: (user: any) => {
        this.users.push(user);
        this.adminForm.reset();
      },
      error: () => alert('Failed to add admin')
    });
  }
}
