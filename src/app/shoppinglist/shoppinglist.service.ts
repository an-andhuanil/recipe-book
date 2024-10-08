import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  constructor() { }
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients : Ingredient[] = [
    new Ingredient('apple',5),
    new Ingredient('orange',25),
    new Ingredient('grape',15),
    new Ingredient('pineapple',35),
    new Ingredient('mango',56),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients : Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice())
  }

  updateIngredient(index : number,newIngredient : Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index : number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
