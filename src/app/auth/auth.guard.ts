import { Injectable } from "@angular/core";
import { map, take, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard {

   constructor(
      private authService: AuthService,
      private router: Router
   ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authService.user.pipe(
         take(1),
         map(user => {
            const isAuth = !!user.email;
            if (isAuth)
               return true;
            return this.router.createUrlTree(['/auth']);
         }));
   }
}
