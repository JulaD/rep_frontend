import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
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
        map((result: boolean) => {
          let activate: boolean = result as boolean;
          if (!activate) {
            this.router.navigate(['']);
          }
          return activate;
        }),
        catchError((err: any, caught: Observable<boolean>): Observable<boolean> => {
          this.router.navigate(['']);
          return new Observable<boolean>();
        })
      );
  }
}