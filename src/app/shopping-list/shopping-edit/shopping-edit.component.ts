import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Ingrediant } from 'src/app/Shared/Ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
editMode:boolean;
editIndex:number;
editedItem:Ingrediant;
@ViewChild('myform',{static:false}) myform:NgForm;
subscription:Subscription;
  constructor(private shoppinglistservice:ShoppingListService) { }

  ngOnInit() {
       
    this.subscription=this.shoppinglistservice.startingEdit.subscribe(
      (index:number)=>{
          this.editIndex=index;
          this.editMode=true;
          this.editedItem=this.shoppinglistservice.getIngrediant(index)
          this.myform.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          })
      }
    )
  }
  datasubmit(form:NgForm)
  {
    const value=form.value;
    const newIngrediant=new Ingrediant(value.name,value.amount);
    if(this.editMode)
    {
      this.shoppinglistservice.updateIngrediant(this.editIndex,newIngrediant);
    }
    else
    {
      this.shoppinglistservice.addIngrediants(newIngrediant)
      this.editMode=false; 
    }
    
    
   form.reset();
  }
  onDelete()
  {
    this.shoppinglistservice.DeleteIngrediant(this.editIndex);
    this.onClear();
    
  }
  onClear()
  {
    this.myform.reset();
    this.editMode=false;
  }
   ngOnDestroy()
   {
     this.subscription.unsubscribe();
   }

}
