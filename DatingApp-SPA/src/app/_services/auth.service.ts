import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  user: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeUserPhoto(url: string) {
  this.photoUrl.next(url);
}

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.decodedToken = this.jwtHelper.decodeToken(response.token);
        this.user = response.user;
        this.changeUserPhoto(this.user.photoURL);
      }
    })
  );
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
