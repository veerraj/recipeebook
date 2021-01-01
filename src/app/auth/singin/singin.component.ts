import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  constructor(private authserive:AuthService,private router:Router) { }
  token:string;
  ngOnInit() {
    
  }
  onSignin(form:NgForm)
  {
    console.log("hii")
    const email=form.value.email;
    const password=form.value.password;
    this.authserive.SigninUser(email,password);
    //const token=this.authserive.getToken();
    
  }
  
  

}
