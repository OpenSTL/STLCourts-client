import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoaderService} from '../services/loader.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loaderService.start();
    return next.handle(req)
      .pipe(
        finalize(() => {
          this.loaderService.complete();
        })
      );
  }
}
