import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


const appRoutes : Routes = [
    {path:'',redirectTo:'/recipes',pathMatch:'full'},
    {
        path : 'recipes' , 
        loadChildren : () => import('./recipes/recipe.module').then(m => m.RecipeModule)
    },
    {
        path : 'shopping-list',
        loadChildren : () => import('./shoppinglist/shoppinglist.module').then(m => m.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)
    }               

];  


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy : PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{
} 


