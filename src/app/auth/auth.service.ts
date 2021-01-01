import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService{
    token:string;
    constructor(private router:Router){}
    logout()
    {
        firebase.auth().signOut;
        this.token=null;
    }
    SignupUser( email:string, password:string)
    {
        
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(
            (error)=>console.log(error)
        )
    }
    SigninUser( email:string, password:string)
    {
        firebase.auth().signInWithEmailAndPassword(email,password).
        then(
            (response)=>{
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token:string)=>
                    {
                        this.token=token;
                       this.router.navigate(['recipes']);
                    }
                )
            }
        )
        .catch(
            (error)=>console.log(error)
        )
    }
    getToken()
    {
        return this.token;
       
    }
    isAuthenticated()
    {
        return this.token!=null;
    }
}