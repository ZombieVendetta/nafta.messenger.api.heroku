import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginForm } from '../models/loginForm';

@Component({
    selector: 'login',
    styleUrls: ['app/login/login.component.css'],
    template: `
<div class="outer">
    <h1>SIGN IN</h1>
    <div class="inner">
        <div class="elements">
            <input type="text" class="text" placeholder="Email address" [(ngModel)]="form.Email" />
            <input type="password" class="text" placeholder="Password" [(ngModel)]="form.Password" />
            <button (click)="signIn(form)" class="button">SIGN IN</button>
            <button (click)="signUp()" class="button">SIGN UP</button>
        </div>
    </div>
</div>`
})

export class LoginComponent {
    form: LoginForm = new LoginForm();

    constructor(private authService: AuthService, private router: Router) { }

    signIn(form: LoginForm) {
        this.authService.login('/Token', this.form);
    }

    signUp() {
        this.router.navigate([{ outlets: { primary: ['register'] } }], { skipLocationChange: true });
    }
}