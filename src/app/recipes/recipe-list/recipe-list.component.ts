import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
selector: 'app-recipe-list',
templateUrl: './recipe-list.component.html',
styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  subscription:Subscription;
recipies:Recipe[];
constructor(private recipeservice:RecipeService,
            private router:Router,private route:ActivatedRoute) { }

ngOnInit() {
  this.subscription=this.recipeservice.recipeChanged.subscribe(
    (recipe:Recipe[])=>{
      this.recipies=recipe;
    }
  )
  this.recipies=this.recipeservice.getRecipe();
}
onNewRecipe()
{
    this.router.navigate(['new'],{relativeTo:this.route})
}
ngOnDestroy()
{
  this.subscription.unsubscribe();
}
}
