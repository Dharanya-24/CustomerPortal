import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  // Navigate to profile page
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  // Logout function
  logout() {
    localStorage.clear(); // optional: clears user ID from storage
    this.router.navigate(['/']);
  }
}
