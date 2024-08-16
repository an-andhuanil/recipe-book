import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { retry, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist/shoppinglist.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private shoppinglistService : ShoppinglistService) { }
  recipesChanged = new Subject<Recipe[]>();
  // private recipes : Recipe[] =[
  //   new Recipe(
  //     'A Test Recipe', 
  //     'This is simply a test', 
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [
  //       new Ingredient('Meat',1),
  //       new Ingredient('Eggs',10)
  //     ]),
  //   new Recipe(
  //     'Another Test Recipe',
  //    'This is simply a test', 
  //    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //    [
  //       new Ingredient('Lays',25),
  //       new Ingredient('Bingo',10)
  //    ])
  // ];

  private recipes : Recipe[] = [];
  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(){
    return this.recipes.slice();
  }

  getRecipeById(index : number){
    return this.recipes[index];
  }


  addIngToShoppingList(ingredients : Ingredient[]){
    this.shoppinglistService.addIngredients(ingredients);
  }

  addRecipe(recipe :Recipe){
    console.log(recipe)
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number , newRecipe : Recipe){
    console.log(newRecipe)
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
