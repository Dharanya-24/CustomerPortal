import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sales-order-data',
  templateUrl: './sales-order-data.component.html',
  styleUrls: ['./sales-order-data.component.css']
})
export class SalesOrderDataComponent implements OnInit {
  salesOrders: any[] = [];
  userId: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard/sales-data']);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';

    if (this.userId) {
      const url = `http://localhost:3000/api/sales-order/${this.userId}`;

      this.http.get<any[]>(url).subscribe(
        (data) => {
          console.log('Sales Order API response:', data); 
          this.salesOrders = data;
          console.log('First Record:', this.salesOrders[0]);
        },
        (error) => {
          console.error('Error fetching sales order data:', error);
        }
      );
    } else {
      console.warn('User ID not found in local storage.');
    }
  }
}
