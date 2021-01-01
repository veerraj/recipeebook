import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recpData:Recipe;
id:number;
  constructor(private recipeservice:RecipeService,private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {

    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recpData=this.recipeservice.getRecipes(this.id);
      }
    )
  }
  AddIngrediants()
  {
    this.recipeservice.addIngrediantstoShoppingList(this.recpData.ingrediants)
  }
  onEditRecipe()
  {
    this.router.navigate(['edit'],{relativeTo:this.route})
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }
  onDeleteRecipe()
  {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
