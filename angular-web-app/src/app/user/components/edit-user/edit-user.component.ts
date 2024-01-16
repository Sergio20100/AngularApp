import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  angForm: FormGroup;
  user?: User;
  id:string | null = null;
  subscription: any;
  constructor(
    private formBuilder: FormBuilder, private route: Router,
    private serviceUser: UserService,
    private activeRoute: ActivatedRoute
    ) {
   
      this.angForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
    })
    this.subscription = this.activeRoute.paramMap.subscribe(params=>{
      this.id = params.get('id');
    })
  }

  ngOnInit(): void {
    this.listByID(Number(this.id))
  }


  listByID(id: number) {
    const currentID: string = id.toString()
    this.serviceUser.getUserByID(currentID).subscribe(data => {
      if (data) {
        this.user = data[0];
        console.log(this.user)
        this.angForm.patchValue(this.user)
      }
    })
  }
  updateUser(form: FormGroup) {
    if(this.id!=null){
      this.serviceUser.updateUser({
        name: form.value.name,
        password: form.value.password,
        username: form.value.username
      },this.id).pipe(first()).subscribe(data=>{
        this.route.navigate(['home'])
      })
    }
   }
}

