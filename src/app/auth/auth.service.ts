import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfXI-XR1IVe6pzr17SCiNlQMiLUfVI2-s', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfXI-XR1IVe6pzr17SCiNlQMiLUfVI2-s', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(() => {
        return new Error(errorMessage)
      });
    }
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS': errorMessage = 'This email already exists!'; break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist!'; break;
      case 'INVALID_LOGIN_CREDENTIALS': errorMessage = 'The entered logging credentials are incorrect!'; break;
      case 'INVALID_PASSWORD': errorMessage = 'The password is invalid or the user does not have a password.'; break;
      case 'USER_DISABLED': errorMessage = 'The user account has been disabled by an administrator.'; break;
      default: break;
    }
    return throwError(() => {
      return new Error(errorMessage)
    });
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}