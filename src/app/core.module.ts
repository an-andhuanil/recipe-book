import { NgModule } from "@angular/core";
import { ShoppinglistService } from "./shoppinglist/shoppinglist.service";
import { RecipeService } from "./recipes/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { LoggingService } from "./logging.service";

@NgModule({
    providers: [
        ShoppinglistService,
        RecipeService,
        {
          provide : HTTP_INTERCEPTORS,
          useClass : AuthInterceptorService,
          multi : true
        },
        LoggingService
      ],
})
export class CoreModule{

}