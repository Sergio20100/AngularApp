import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http: HttpClient){ }

    url:string = "http://127.0.0.1:5000/api/v1/users";
    getUsers(): Observable<User | undefined>{
        return this.http.get<User >(this.url).pipe(
            catchError ((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }

}