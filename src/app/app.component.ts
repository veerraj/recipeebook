import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipeapp';
  selectedcondition='recipe';
  onNavigate(feature:string)
  {
     this.selectedcondition=feature;
  }
  ngOnInit()
  {
     firebase.initializeApp({
      apiKey: "AIzaSyBa3mztiS7DkCoN8LU5avRNQj3-uEL75wI",
      authDomain: "recipe-book-e2ec4.firebaseapp.com"
     })
  }
}
