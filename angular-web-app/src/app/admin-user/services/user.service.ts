import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, of } from "rxjs";
import { User } from "../interfaces/user.interface";
import { ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn:'root'
})
export class UserService{
    headersRequest:HttpHeaders
    constructor(private http: HttpClient,private activeRoute: ActivatedRoute, private cookiesService:CookieService){ 
        
        this.headersRequest = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.cookiesService.get('token')}`
          })
    }
    
    // url:string = "http://127.0.0.1:5000/api/v1/users";
    url:string = 'http://127.0.0.1:5000';
    getUsers(): Observable<User[] | undefined>{
        return this.http.get<User[] >(this.url+'/admin-users',{
            headers:this.headersRequest
        }).pipe(
            catchError ((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }

    getUserByID(id:string): Observable<User[] | undefined>{
        return this.http.get<User[] >(this.url+'/admin-users/'+id,{
            headers:this.headersRequest
        }).pipe(
            catchError ((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }
    addUser(body:User): Observable<User | undefined>{
        return this.http.post<User>(this.url+'/admin-user',body,{
            headers:this.headersRequest
        }).pipe(

            catchError((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }
    deleteUser(id:string):Observable<any | undefined>{
        return this.http.delete(this.url+'/admin-users-delete/'+id,{
            headers:this.headersRequest
        })
    }
    
    updateUser(body:User,id:string): Observable<User | undefined>{
        return this.http.put<User>(this.url+'/admin-users-edit/'+id,body,{
            headers:this.headersRequest
        }).pipe(

            catchError((err)=>{
                console.log(err)
                return of(undefined)
            })
        )
    }
    

}