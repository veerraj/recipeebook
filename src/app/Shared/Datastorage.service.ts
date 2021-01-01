import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import 'rxjs/Rx'
import { AuthService } from '../auth/auth.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
@Injectable()
export class DataStorageService{

    constructor(private http:HttpClient,private recipeservice:RecipeService
        ,private authservice:AuthService){}

    storeRecipes(){
        const token=this.authservice.getToken();
        return this.http.put('https://recipe-book-e2ec4.firebaseio.com/recipes.json?auth='+token, this.recipeservice.getRecipe())
    }

    getRecipes()
    {
        const token=this.authservice.getToken();
        return this.http.get('https://recipe-book-e2ec4.firebaseio.com/recipes.json?auth='+token).
        map(
            (resp:any)=>{
                const recipes:Recipe[] = resp;
                for(let recipe of recipes)
                {
                    if(!recipe['ingrediants'])
                    {
                        recipe['ingrediants']=[];
                    }
                }
                return recipes;
             } ).
        subscribe(
            (recipe:Recipe[])=>{
               
                //console.log(recipes)
               this.recipeservice.setRecipes(recipe)
                //return recipes;
            }
        )
    }

}