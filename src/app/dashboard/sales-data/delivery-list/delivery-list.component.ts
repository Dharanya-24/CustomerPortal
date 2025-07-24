import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  deliveryData: any[] = []; // ✅ Initialize as an empty array

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const url = `http://localhost:3000/api/delivery/${userId}`;
      this.http.get<any[]>(url).subscribe(
        res => {
          this.deliveryData = res; // ✅ Assign array from backend
        },
        err => {
          console.error('Error fetching delivery data', err);
        }
      );
    } else {
      console.error('Customer ID not found in localStorage.');
    }
  }
}
