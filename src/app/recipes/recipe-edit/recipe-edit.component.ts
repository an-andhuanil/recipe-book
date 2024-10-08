import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode = false;
  recipeForm: FormGroup;
  constructor( private route:ActivatedRoute,
    private recipeService: RecipeService,
    private router : Router
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];//use of +  convert string to number
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm(){
    let recipeName = '';
    let recipePath = '';
    let recipeDesc = '';
    let recipeIngredients =  new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name;
      recipePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new  FormGroup({
              'name' : new FormControl(ingredient.name,Validators.required),
              'amount' : new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          );
        }
      }
    }    
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipePath,Validators.required),
      'description' : new FormControl(recipeDesc,Validators.required),
      'ingredients' : recipeIngredients
    });

  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
    );
    console.log(newRecipe)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }
    else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' :new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo : this.route})
  }

  onDeleteIng(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
