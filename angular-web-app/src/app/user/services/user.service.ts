import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http: HttpClient){ }

    // url:string = "http://127.0.0.1:5000/api/v1/users";
    url:string = 'http://127.0.0.1:5000';
    getUsers(): Observable<User[] | undefined>{
        return this.http.get<User[] >(this.url+'/users').pipe(
            catchError ((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }
    addUser(body:User): Observable<User | undefined>{
        return this.http.post<User>(this.url+'/user',body).pipe(
            catchError((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }
    deleteUser(id:string):Observable<any>{
        return this.http.delete(this.url+'/delete/'+id)
    }

}