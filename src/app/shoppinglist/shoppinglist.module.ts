import { NgModule } from "@angular/core";
import { ShoppinglistComponent } from "./shoppinglist.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shoppinglist-routing.module";

@NgModule({
    declarations:[
        ShoppinglistComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ShoppingListRoutingModule
    ],
})
export class ShoppingListModule{}