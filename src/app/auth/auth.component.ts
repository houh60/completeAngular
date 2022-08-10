import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData } from './auth-response-data';
import { AuthService } from './auth.service';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

   isLoginMode = true;
   errorMessage: any = null;
   isLoading = false;
   @ViewChild(PlaceholderDirective) alertHost?: PlaceholderDirective;
   private closeSub?: Subscription;

   constructor(
      private authService: AuthService,
      private router: Router,
      private componentFactoryResolver: ComponentFactoryResolver,
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
            this.showErrorAlert(this.errorMessage);
         }
      })

      form.reset();
   }

   onOKay() {
      this.errorMessage = null;
   }

   onHandleError() {
      this.errorMessage = null;
   }

   private showErrorAlert(message: string) {
      // const alertCmp = new AlertComponent(); // this is not going to work.
      const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.alertHost?.viewContainerRef;
      hostViewContainerRef?.clear();
      const componentRef = hostViewContainerRef?.createComponent(alertFactory);
      componentRef!.instance.message = message;
      this.closeSub = componentRef!.instance.close.subscribe(() => {
         this.closeSub?.unsubscribe();
         hostViewContainerRef?.clear();
      });
   }


   ngOnDestroy(): void {
      if(this.closeSub) {
         this.closeSub.unsubscribe();
      }
   }
}
