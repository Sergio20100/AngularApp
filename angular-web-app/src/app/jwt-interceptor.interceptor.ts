import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core"
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class jwtInterceptorInterceptor implements HttpInterceptor{

  constructor(private cookieService: CookieService, private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const encode_token:string = this.cookieService.get('token');
    let request = req;
    if(encode_token){
      request = req.clone({setHeaders:{
        Authorization: `Bearer ${encode_token}`
      }})
    }
    return next.handle(request)
  }
}