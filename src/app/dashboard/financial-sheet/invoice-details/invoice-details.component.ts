import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  invoices: any[] = [];
  errorMessage = '';
  customerId = localStorage.getItem('userId') || '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.customerId) {
      this.fetchInvoices();
    } else {
      this.errorMessage = 'No Customer ID found';
    }
  }

  fetchInvoices(): void {
    this.http.get<any>(`http://localhost:3000/api/invoices/${this.customerId}`).subscribe({
      next: (res) => {
        this.invoices = res.invoices || [];
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch invoice data';
      }
    });
  }

  downloadPDF(fileName: string): void {
    const url = `http://localhost:3000/invoices/${fileName}`;
    window.open(url, '_blank');
  }
}

