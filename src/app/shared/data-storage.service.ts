import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http:HttpClient,
    private recipeService : RecipeService,
    private authService : AuthService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipe();
    return (
      this.http.put('https://recipebook-61e32-default-rtdb.firebaseio.com/recipes.json',recipes)
      .subscribe((res) =>{
        console.log(res);
      })
    );
  }

  fetchRecipes(){
      return this.http
      .get<Recipe[]>('https://recipebook-61e32-default-rtdb.firebaseio.com/recipes.json',)
      .pipe(map( (recipes) => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          }
        );
      }),tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
    );
  }
}
