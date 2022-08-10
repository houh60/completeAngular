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

   logout() {
      this.user.next({} as User);
      this.router.navigate(['/auth']);
   }

   private authenticationHandling(email: string, userId: string, token: string, expiresIn: number) {
      const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000)
      const user = new User(email, userId, token, tokenExpirationDate);
      this.user.next(user);
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
