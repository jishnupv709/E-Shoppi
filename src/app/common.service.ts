import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) {}
  
  getUser(): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/users/1`)
      .pipe(catchError(this.handleError));
  }

  getData(url: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${url}`)
      .pipe(catchError(this.handleError));
  }

  postData(url: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${url}`, data, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = error.error?.message || 'An error occurred';
    return throwError(() => new Error(errorMessage));
  }
}
