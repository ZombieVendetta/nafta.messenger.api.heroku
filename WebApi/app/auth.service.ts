import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LoginForm } from './models/loginForm';
import { CONFIGURATION } from './app.constants';

@Injectable()
export class AuthService {

    constructor(private http: Http, private router: Router) { }

    login(url: string, form: LoginForm) {
        let body = "username=" + form.Email + "&password=" + form.Password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post(CONFIGURATION.baseUrls.server + url, body, { headers: headers }).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);
                this.router.navigate([{ outlets: { primary: ['home'] } }], { skipLocationChange: true });
                alert("Login successful");
            },
            error => {
                alert("Wrong login or password. Try again");
            }
        );
    }

    logOut() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        this.router.navigate([{ outlets: { primary: ['login'], navBar: null, leftBar: null, general: null } }], { skipLocationChange: true });
    }
}