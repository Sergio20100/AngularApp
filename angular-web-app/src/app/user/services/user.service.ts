import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs";
import { User } from "../interfaces/user.interface";
import { ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http: HttpClient,private activeRoute: ActivatedRoute){ }

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

    getUserByID(id:string): Observable<User[] | undefined>{
        return this.http.get<User[] >(this.url+'/users/'+id).pipe(
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
    deleteUser(id:string):Observable<any | undefined>{
        return this.http.delete(this.url+'/delete/'+id)
    }
    
    updateUser(body:User,id:string): Observable<User | undefined>{
        return this.http.put<User>(this.url+'/edit/'+id,body).pipe(

            catchError((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }
    

}