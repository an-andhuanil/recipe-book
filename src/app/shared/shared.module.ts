import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";
import { ShortenPipe } from './shorten.pipe';

@NgModule({
    declarations : [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        ShortenPipe,
    ],
    imports : [
        CommonModule,   
    ],
    exports : [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
        ShortenPipe
    ],
    entryComponents: [AlertComponent]

})
export class SharedModule{

}