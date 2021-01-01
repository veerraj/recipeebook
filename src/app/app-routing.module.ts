import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component'
import {ShoppingListComponent} from './shopping-list/shopping-list.component'
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SingupComponent } from './auth/singup/singup.component';
import { SinginComponent } from './auth/singin/singin.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
 
  { path:'',redirectTo:'/register',pathMatch:'full'},
  { path:'recipes',component:RecipesComponent,children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent,canActivate:[AuthGuardService]},
    {path:':id',component:RecipeDetailComponent},
    {path:':id/edit',component:RecipeEditComponent,canActivate:[AuthGuardService]},
   
    
  ]},
  { path:'shopping-list',component:ShoppingListComponent},
  {path:'register',component:SingupComponent},
  {path:'login',component:SinginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
