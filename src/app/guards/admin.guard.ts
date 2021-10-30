import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UserTypes } from "../enums/UserTypes";
import { User } from "../models";
import { AuthService } from "../services";

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.checkUser()
      .pipe(
        map((user: {userId: number, userType: number}) => {
          if (!user) {
            this.router.navigate(['']);
          }
          return user.userType == UserTypes.Admin;
        }),
        catchError((err: any, caught: Observable<boolean>): Observable<boolean> => {
          this.router.navigate(['']);
          return new Observable<boolean>();
        })
      );
  }
}