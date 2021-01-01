import { Ingrediant } from '../Shared/Ingrediant.model';

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingrediants:Ingrediant[];

    constructor(name:string,desc:string,image:string,ingrediants:Ingrediant[])
    {
        this.name=name;
        this.description=desc;
        this.imagePath=image;
        this.ingrediants=ingrediants;
    }
}