import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';

interface UserSubmission {
  firstName: string;
  lastName: string;
  timestamp: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  submissions: UserSubmission[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.error = null;
    
    this.http.get<UserSubmission[]>(`${environment.apiUrl}/api/names/stats`)
      .subscribe({
        next: (data) => {
          this.submissions = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load stats. Please try again later.';
          this.loading = false;
          console.error('Error loading stats:', err);
        }
      });
  }
} 