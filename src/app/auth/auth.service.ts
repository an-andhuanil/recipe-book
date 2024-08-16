import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../env/environment';

export interface AuthResponseData{
  kindc : string;
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  registered ?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer : any;
  constructor(
    private http : HttpClient,
    private router : Router) { }  

  signUp(email : string, password : string,){
    return (this.http.post<AuthResponseData>(environment.signupUrl + environment.serverUrl,
      {
        email : email,
        password : password,
        returnSecureToken : true,
        displayName:'sasiiiii '
      }
    ).pipe(catchError(this.handleError),tap((resData) =>{
      this.authenticationHandler(
        resData.email,
        resData.localId,
        resData.idToken,
        resData.expiresIn
      );
    })
    ));
  }

  login(email : string , password : string){

    return (this.http.post<AuthResponseData>(environment.loginUrl + environment.serverUrl,
    {
      email : email,
      password : password,
      returnSecureToken : true
    }
    ).pipe(catchError(this.handleError),tap((resData) => {
      this.authenticationHandler(
        resData.email,
        resData.localId,
        resData.idToken,
        resData.expiresIn
      );
    })
    ));
  }

  autoLogin(){
   const userData : {
    email : string;
    id : string;
    _token : string;
    _tokenExpirationDate : string;
   } = JSON.parse(localStorage.getItem('userData'));
   if(!userData){
    return;
   }
   const loadedUser = new User(
    userData.email,
    userData.id,
    userData._token,
    new Date(userData._tokenExpirationDate)
    );
    if(loadedUser.getToken()){
      this.user.next(loadedUser);
      const expirationDuartion =
       new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuartion);
    }
  }


  autoLogout(expiartionDuration : number){
    this.tokenExpirationTimer =  setTimeout(() => {
      this.logout();
    },expiartionDuration);

  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private authenticationHandler(email : string, userId : string ,_token : string ,expiresIn : string){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email, 
      userId, 
      _token, 
      expirationDate
    );
    this.autoLogout(+expiresIn * 1000);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
