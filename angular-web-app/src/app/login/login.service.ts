import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";


type dataLogin = {username:string, password:string}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = 'http://127.0.0.1:5000/login';
  constructor(private http: HttpClient,private activeRoute: ActivatedRoute) { }
  login(body:dataLogin){
    return this.http.post(this.url,body)
  //   .pipe(
  //     catchError ((err)=>{
  //         console.log(err)
  //         return of(undefined)
  //     })
  // )
  }
}
