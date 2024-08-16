import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,AuthResponseData } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit , OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error : string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeButton : Subscription;
  constructor(
    private authService : AuthService,
    private router : Router,
    private componentFactoryResolver : ComponentFactoryResolver ) { }
 

  ngOnInit(): void {
  }

  onSwitchMode(){
  this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }else{
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      let authObs : Observable<AuthResponseData>;
      if(this.isLoginMode){
        authObs =  this.authService.login(email,password)
      }else{
        authObs =  this.authService.signUp(email,password)
      }
      authObs.subscribe((res) =>{
        this.isLoading = false;
        this.router.navigate(['/recipes'])
        console.log(res);
      },(error) => {
        this.error = error;
        this.isLoading = false;
        this.showErrorAlert(error);
      })
      form.reset();
    }
  }


  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(error : string){
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

   const componentRef =  hostViewContainerRef.createComponent(alertCmpFactory);
   componentRef.instance.message = error;
  this.closeButton = componentRef.instance.close.subscribe(() =>{
      this.closeButton.unsubscribe();
      hostViewContainerRef.clear();
   });
  }

  ngOnDestroy(): void {
    if(this.closeButton){
      this.closeButton.unsubscribe();
    }
  }
}

