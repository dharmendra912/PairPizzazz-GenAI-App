import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  constructor(private http: HttpClient) {}

  checkHealth() {
    // Fire and forge to fix cold start of server.
    this.http.get(`${environment.apiUrl}/api/names/health`).subscribe({
      error: () => {
        console.log("API server is down.")
      }
    });
  }
} 