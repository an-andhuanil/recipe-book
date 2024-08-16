import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConstantPool } from '@angular/compiler';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit , OnDestroy {
  recipes : Recipe[];
  subScription : Subscription;
  constructor(private recipeService: RecipeService,
              private route : Router,
              private router : ActivatedRoute,
              private dataStorageService : DataStorageService
  ) {
   }
  isLoading : boolean = false;

  ngOnInit(){
    this.isLoading = true;
    this.subScription = this.recipeService.recipesChanged.subscribe((recipes : Recipe[])=>{
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipe();
    console.log(this.recipes);
    this.dataStorageService.fetchRecipes().subscribe((res) =>{
      this.isLoading = false;
    });
  }

  onNewRecipe(){
    this.route.navigate(['new'],{relativeTo : this.router});
  }

  ngOnDestroy(): void {
    this.subScription .unsubscribe();
  }
}
