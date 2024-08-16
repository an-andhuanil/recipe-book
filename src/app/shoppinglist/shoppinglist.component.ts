import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit ,OnDestroy{
  
  constructor(private shoppingService:ShoppinglistService, private loggingServce : LoggingService) { }
  isLoading : boolean = false;
  ingredients : Ingredient[];
  private igChangeSub: Subscription;
  ngOnInit() {
    this.isLoading = true;
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSub = this.shoppingService.ingredientChanged.subscribe((ingredients : Ingredient[])=>{
      this.ingredients = ingredients;
    });
    setTimeout(() => {
      this.isLoading = false;
    },1000);
    this.loggingServce.printLog('From Shopping List');
  }
  // onIngredientAdded(ingredient : Ingredient){
  //   // this.ingredients.push(ingredient);
  //   this.shoppingService.addIngredient(ingredient);
  // }

  onEditItem(index : number){
    this.shoppingService.startedEditing.next(index);

  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}