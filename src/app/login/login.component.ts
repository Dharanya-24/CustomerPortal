import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    userId: '',
    password: ''
  };
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const url = 'http://localhost:3000/api/login';

    this.http.get<any>(url, {
      params: {
        userId: this.loginData.userId,
        password: this.loginData.password
      }
    }).subscribe(
      res => {
        this.message = res.message || 'Login successful';

        if (res.message === 'Login successful') {
          // Store userId in local storage
          localStorage.setItem('userId', this.loginData.userId);

          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        }
      },
      err => {
        this.message = err.error?.message || 'Login failed';
      }
    );
  }
}
