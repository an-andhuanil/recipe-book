import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppinglistComponent } from "./shoppinglist.component";
import { AuthGuard } from "../auth/auth.guard";

const shoppingListRoutes : Routes = [

    {path : '', component:ShoppinglistComponent,canActivate : [AuthGuard]},

];



@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule{}