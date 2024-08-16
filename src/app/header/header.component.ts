import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{
    private userSubscribtion: Subscription;
    @Output() featureSelected = new EventEmitter<string>();
    isAuthenticated = false;
    constructor(
        private dataStorageService : DataStorageService,
        private authService : AuthService
    ) {}

    ngOnInit(){
        this.userSubscribtion =  this.authService.user.subscribe( (user) => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    onSelect(feature:string){
        this.featureSelected.emit(feature);
        console.log("fgg")
    }


    onSave(){
        this.dataStorageService.storeRecipes();
    }


    fetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.userSubscribtion.unsubscribe();
    }

}