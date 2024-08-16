import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;
  id : number;
  constructor(private recipeService : RecipeService,
              private router:ActivatedRoute,
              private route : Router
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe((params : Params) => {
        this.id = +params['id'];
        // console.log(+this.id);
        this.recipe = this.recipeService.getRecipeById(this.id);
        console.log(this.recipe)
    })
  }

  onAddtoShoppingList(){
    this.recipeService.addIngToShoppingList(this.recipe.ingredients);
  }

  onNewEdit(){
    this.route.navigate(['../',this.id,'edit'],{relativeTo : this.router});
  }
  OnDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.route.navigate(['/recipes'])
  }
}
