import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class userGuardGuard {
    constructor(private cookiesService:CookieService, private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
      const cookie = this.cookiesService.check('token')
      if(!cookie){
        this.router.navigate(['login'])
      }
    }


  };
