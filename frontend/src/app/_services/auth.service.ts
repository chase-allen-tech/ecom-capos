import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../_models/user';
import {apiUrl} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public ipAddress = new BehaviorSubject('');
  public currentUser: BehaviorSubject<User>;
  constructor(
    public jwtHelper: JwtHelperService,
    private route: Router,
    private http: HttpClient,
  ) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.getIpAddress();
  }

  setToken(token): any {
    localStorage.setItem('token', token);
  }

  public get getCurrentUser(): User {
    return this.currentUser.value;
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  getUrl(uri): string {
    return apiUrl + uri;
  }

  getIpAddress(): any {
    this.http.get('https://jsonip.com').subscribe((res: any) => {
      this.ipAddress.next(res.ip);
    });
  }


  signUp(user): any {
    return this.http.post(this.getUrl('auth/register'), user);
  }

  signIn(user): any {
    return this.http.post(this.getUrl('auth/login'), user).pipe(map(
      (result: any) => {
        if (result && result.token) {
          const decoded = this.jwtHelper.decodeToken(result.token);
          decoded._id = decoded.user_id;
          this.setCurrentUser(decoded);
          this.setToken(result.token);
          return decoded;
        }
      }
    ));
  }

  setCurrentUser(user): void {
    this.currentUser.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  isLoggedIn(): any {
    const token = localStorage.getItem('token');
    return (token !== 'undefined' && token !== null && !this.jwtHelper.isTokenExpired());
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.route.navigateByUrl('');
  }
}
