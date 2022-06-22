import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly baseUrl = "https://httpstat.us";
  
  constructor(private readonly http: HttpClient) { }
  
  getData(status: number): Observable<HttpResponse<Object>> {
    return this.http.get(`${this.baseUrl}/${status}`, {
      observe: 'response'
    });
  }
}