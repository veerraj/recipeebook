import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingrediant } from '../Shared/Ingrediant.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService
{
    recipeChanged=new Subject<Recipe[]>()
    private recipies:Recipe[]=[
        new Recipe('Test Recpie',
        'Test Recpie Descriprtion',
        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
        [
            new Ingrediant('Meat',1),
            new Ingrediant('French Fries',4),
        ]),
        new Recipe('Another Test Recpie',
        'Another Test Recpie Descriprtion',
        'https://get.pxhere.com/photo/dish-food-cuisine-ingredient-produce-recipe-meat-vegetarian-food-comfort-food-side-dish-bento-Yong-tau-foo-meal-salad-teriyaki-chinese-food-japanese-cuisine-donburi-1575227.jpg',
        [
            new Ingrediant('Potato',5),
            new Ingrediant('Tomato',4),
        ])
    ]
    constructor(private shoppinglistservice:ShoppingListService)
    {

    }
    setRecipes(recipe:Recipe[])
    {
        this.recipies=recipe;
        this.recipeChanged.next(this.recipies.slice());
    }

    getRecipe()
    {
        return this.recipies.slice();
    }
    getRecipes(index:number)
    {
        return this.recipies.slice()[index]
    }
    addIngrediantstoShoppingList(ing:Ingrediant[])
    {
        this.shoppinglistservice.addIngrediant(ing)
    }
    addRecipe(recipe:Recipe)
    {
        this.recipies.push(recipe);
        this.recipeChanged.next(this.recipies.slice());
    }
    updateRecipe(index:number,newrecipe:Recipe)
    {
        this.recipies[index]=newrecipe;
        this.recipeChanged.next(this.recipies.slice());
    }
    deleteRecipe(index:number)
    {
        this.recipies.splice(index,1);
        this.recipeChanged.next(this.recipies.slice());
    }
}