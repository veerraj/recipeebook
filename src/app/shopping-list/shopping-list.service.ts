import { Ingrediant } from '../Shared/Ingrediant.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    startingEdit=new Subject();
    ingrediantsChanged=new Subject<Ingrediant[]>()
    private ingrediants:Ingrediant[]=[]; 

    getIngrediants()
    {
        return this.ingrediants.slice();
    }
    getIngrediant(index:number)
    {
        return this.ingrediants[index];
    }
    addIngrediants(ing:Ingrediant)
    {
        this.ingrediants.push(ing);
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
    addIngrediant(ing:Ingrediant[])
    {
        this.ingrediants.push(...ing);
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
    updateIngrediant(index:number,newIngrediant:Ingrediant)
    {
        this.ingrediants[index]=newIngrediant;
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
    DeleteIngrediant(index:number)
    {
        this.ingrediants.splice(index,1)
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }
}