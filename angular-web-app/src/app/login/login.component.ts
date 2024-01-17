import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  angForm: FormGroup;
  response: any ={success:''}
  constructor(private formBuilder: FormBuilder, private cookieService:CookieService,  private route: Router, private serviceLogin: LoginService) {
    this.angForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  postdata() {
    console.log(this.angForm.value)
    this.serviceLogin.login({
      password: this.angForm.value.password,
      username: this.angForm.value.username
    }).pipe(first()).subscribe(response => {
        console.log(response)
        this.response = response
        if(this.response.token){
          this.cookieService.set('token',this.response.token) // se agrega la cookie
          this.route.navigate(['admin-home'])
        }else{
          console.log(this.response.success)
          this.route.navigate(['login'])
        }
    })
  }

} 
