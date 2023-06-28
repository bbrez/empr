import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UserModel } from "../lib/user.model";
import { Router } from '@angular/router';

type UserRegisterPayload = UserModel;
type UserLoginPayload = Pick<UserModel, 'email' | 'password'>

@Injectable({
  providedIn: 'root',
  deps: [HttpClientModule]
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn() {
    const userInfo = localStorage.getItem('user');
    return userInfo != null;
  }

  logIn(user: UserLoginPayload) {
    this.http.post(environment.api + '/users/login', user).subscribe({
      next: (user) => {
        (user as any).message = undefined;
        localStorage.setItem('user', JSON.stringify(user));
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  register(user: UserRegisterPayload) {
    return this.http.post(environment.api + '/users', user).subscribe({
      next: (user) => {
        return true;
      },
      error: (err) => {
        console.error(err);
        return false
      }
    })
  }

  sair() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private roleToInt(role: string) {
    switch (role) {
      case 'Admin':
        return 3;
      case 'Manager':
        return 2;
      case 'Guide':
        return 1;
      case 'Tourist':
        return 0;
      default:
        return -1;
    }
  }

  minRole(role: string) {
    const userInfo = localStorage.getItem('user');
    if (!userInfo) return false;
    return this.roleToInt(JSON.parse(userInfo)?.user?.role) >= this.roleToInt(role);
  }

  get user() {
    const userInfo = localStorage.getItem('user');
    if (!userInfo) return;
    return JSON.parse(userInfo)?.user;
  }

  get token() {
    const userInfo = localStorage.getItem('user');
    if (!userInfo) return;
    return JSON.parse(userInfo)?.token;
  }
}
