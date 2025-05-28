import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface NameConnectionResponse {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNamesConnection(name1: string, name2: string): Observable<NameConnectionResponse> {
    const params: { [key: string]: string } = {
      name1,
      name2
    };

    return this.http.get<NameConnectionResponse>(`${this.apiUrl}/api/names`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && typeof error.error === 'object' && 'message' in error.error) {
        errorMessage = error.error.message;
      } else if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else {
        errorMessage = error.message || 'Failed to get name connection. Please try again.';
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
} 