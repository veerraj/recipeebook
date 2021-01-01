import { Component } from '@angular/core';
import { DataStorageService } from '../Shared/Datastorage.service';
import { AuthService } from '../auth/auth.service';

@Component(
    {
        selector:'app-header',
        templateUrl:'./header.component.html'
    }
)
export class HeaderComponent{

    constructor(private dataservice:DataStorageService,private authservice:AuthService){}
    OnSaveData()
    {
       this.dataservice.storeRecipes().subscribe(
           (resp:Response)=>{
               console.log(resp)
           },
           (error)=>console.log(error)
       )
    }
    OnFetchData()
    {
        this.dataservice.getRecipes();
    }
    onLogout()
    {
        this.authservice.logout();
    }
}