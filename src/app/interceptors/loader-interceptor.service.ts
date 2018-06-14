import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
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
