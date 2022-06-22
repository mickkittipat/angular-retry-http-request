import { Component, OnInit } from '@angular/core';
import { catchError, retryWhen } from 'rxjs/operators';
import { of } from 'rxjs';
import { genericRetryStrategy, ShouldRetryFn } from './rxjs-utils';
import { AppService } from './app.service';
screenLog.init()

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _appService: AppService) { }

  ngOnInit() {
    const shouldRetry : ShouldRetryFn = error => error.status === 500
    this._appService
      .getData(500)
      .pipe(
        retryWhen(genericRetryStrategy({ shouldRetry })),
        catchError(error => of(error))
      )
      .subscribe(console.log);

    this._appService
      .getData(502)
      .pipe(
        catchError(error => of(error))
      )
      .subscribe(console.log);
  }
}
