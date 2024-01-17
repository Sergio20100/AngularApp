import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { jwtInterceptorInterceptor } from './jwt-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: jwtInterceptorInterceptor,
    }
  ]
};
