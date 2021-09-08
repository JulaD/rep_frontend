import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private url: string = environment.api;

  // constructor(
  //   private http: HttpClient,
  //   private router: Router
  // ) { }

  // isAuth(): boolean {
  //   return localStorage.getItem('token') ? true : false;
  // }

  // login(auth: Auth): Observable<any> {
  //   return this.http
  //     .post(`${this.url}/login`, auth)
  //     .pipe(
  //       tap((response: any) => {
  //         let user: User = response.user;
  //         localStorage.setItem('token', response.token);
  //         localStorage.setItem('name', user.name);
  //         localStorage.setItem('email', user.email);
  //         localStorage.setItem('role', String(user.type));
  //       })
  //     );
  // }

  // logout(): void {
  //   localStorage.clear();
  //   this.router.navigate(['auth/login']);
  // }
}
