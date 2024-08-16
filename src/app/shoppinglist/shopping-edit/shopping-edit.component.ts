import { Component,OnDestroy, OnInit,ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  constructor(private shoppingService: ShoppinglistService) { }
  subscribtion : Subscription;
  editMode = false;
  editeditemIndex: number;
  editedItem : Ingredient;
  @ViewChild('f') shoppingForm : NgForm;
  ngOnInit(){
   this.subscribtion = this.shoppingService.startedEditing
    .subscribe(
      (index : number) =>{
        this.editeditemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngr = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editeditemIndex, newIngr);
    }else{
      this.shoppingService.addIngredient(newIngr);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editeditemIndex);
    this.onClear();

  }
  onClear(){
     this.shoppingForm.reset();
     this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
