import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inquiry-data',
  templateUrl: './inquiry-data.component.html',
  styleUrls: ['./inquiry-data.component.css']
})
export class InquiryDataComponent implements OnInit {

  inquiryData: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('userId');
    if (customerId) {
      this.fetchInquiryData(customerId);
    } else {
      console.error('No customer ID found in local storage');
    }
  }

  fetchInquiryData(customerId: string): void {
    const url = `http://localhost:3000/api/inquiry/${customerId}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        console.log('Inquiry data:', data);
        this.inquiryData = data;
      },
      error: (err) => {
        console.error('Error fetching inquiry data:', err);
      }
    });
  }
}
