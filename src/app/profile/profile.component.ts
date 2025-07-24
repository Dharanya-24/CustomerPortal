import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any = {};
  userId: string | null = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.http.get<any>('http://localhost:3000/api/profile', {
        params: { userId: this.userId! }
      }).subscribe(
        res => {
          this.profileData = res;
        },
        err => {
          console.error('Error fetching profile:', err);
        }
      );
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
