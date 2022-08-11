import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "./auth-response-data";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {

   private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
   private signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

   user = new BehaviorSubject<User>({} as User);
   private tokenExpirationTimer: any;

   constructor(
      private http: HttpClient,
      private router: Router
   ) {}


   signup(email: string, password: string) {
      return this.http.post<AuthResponseData>(this.signupUrl + environment.key, {
         email: email,
         password: password,
         returnSecureToken: true
      }).pipe(catchError(this.errorHandling), tap(resData => {
         this.authenticationHandling(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
   }

   login(email: string, password: string) {
      return this.http.post<AuthResponseData>(this.signinUrl + environment.key, {
         email: email,
         password: password,
         returnSecureToken: true
      }).pipe(catchError(this.errorHandling), tap(resData => {
         this.authenticationHandling(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
   }

   autoLogin() {
      const userData = JSON.parse(sessionStorage.getItem('userData') as string);
      if(!userData) {
         return;
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if(loadedUser.token) {
         this.user.next(loadedUser);
         const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
         this.autoLogout(expirationDuration);
      }
   }

   logout() {
      this.user.next({} as User);
      sessionStorage.removeItem('userData');
      this.router.navigate(['/auth']);
      if(this.tokenExpirationTimer) {
         clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
   }

   autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
         this.logout();
      }, expirationDuration);
   }

   private authenticationHandling(email: string, userId: string, token: string, expiresIn: number) {
      const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000)
      const user = new User(email, userId, token, tokenExpirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      sessionStorage.setItem('userData', JSON.stringify(user));
   }

   private errorHandling(error: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if(!error.error || !error.error.error) {
         return throwError(() => new Error(errorMessage));
      }
      switch(error.error.error.message) {
         case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists.';
            break;
         case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
         case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
      }
      return throwError(() => new Error(errorMessage));
   }
}
