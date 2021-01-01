import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingrediant } from '../Shared/Ingrediant.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit,OnDestroy {
subscription:Subscription
ingrediants:Ingrediant[];
  constructor(private shoppinglistservice:ShoppingListService) { }

  ngOnInit() {
    this.ingrediants=this.shoppinglistservice.getIngrediants();
    this.subscription=this.shoppinglistservice.ingrediantsChanged.subscribe(
      (ingrediants:Ingrediant[])=>{
        this.ingrediants=ingrediants; 
      }
    )
  }
  onEditItem(index:number)
  {
    this.shoppinglistservice.startingEdit.next(index);
  }
  ngOnDestroy()
  {
      this.subscription.unsubscribe();
  }
  
  

}
