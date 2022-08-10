import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth-response-data';
import { AuthService } from './auth.service';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

   isLoginMode = true;
   errorMessage: any = null;
   isLoading = false;

   constructor(
      private authService: AuthService,
      private router: Router
   ) {}

   ngOnInit(): void {
   }

   onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
   }

   onSubmit(form: NgForm) {
      if(form.invalid) return;

      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      if(this.isLoginMode) {
         authObs = this.authService.login(email, password);
      } else {
         authObs = this.authService.signup(email, password);
      }

      authObs.subscribe({
         next: res => {
            console.log('res: ', res);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
         },
         error: error => {
            this.isLoading = false;
            this.errorMessage = error.message;
         }
      })

      form.reset();
   }

   onOKay() {
      this.errorMessage = null;
   }
}
