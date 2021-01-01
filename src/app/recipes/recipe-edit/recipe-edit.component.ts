import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editmode:boolean=false;
  recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,private recipesevice:RecipeService,
              private router:Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params)=>{
          this.id=+params['id'];
          this.editmode=params['id']!=null;
          console.log(this.editmode)
          this.initForm();
      }
    )
  }
  onSubmit()
  {
    // const newrecipe=new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['ingrediants']
    // )
    console.log(this.editmode)
    if(this.editmode)
    {
      console.log("hii")
      this.recipesevice.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipesevice.addRecipe(this.recipeForm.value);
    }
  }

  onCancel()
  {
      this.router.navigate(['../'],{relativeTo:this.route});
  }

  onAddIngrediant()
  {
      (<FormArray>this.recipeForm.get('ingrediants')).push(
        new FormGroup({
          'name': new FormControl(null,Validators.required),
          'amount':new FormControl(null,[
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      )
  }
  OnDeleteIngrediant(index:number)
  {
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index)
  }

  private initForm()
  {
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngrediants=new FormArray([]);
    if(this.editmode)
    {
       const recipe=this.recipesevice.getRecipes(this.id);
       
       recipeName=recipe.name;
       recipeImagePath=recipe.imagePath;
       recipeDescription=recipe.description;
       if(recipe['ingrediants'])
       {
         for(let ingrediant of recipe.ingrediants)
         {
           recipeIngrediants.push(
             new FormGroup({
               'name': new FormControl(ingrediant.name,Validators.required),
               'amount':new FormControl(ingrediant.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
               ])
             })
           )
         }
       }
    }
    console.log(recipeImagePath)
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingrediants':recipeIngrediants
      
    })
    console.log(this.recipeForm)
   
  }

}
