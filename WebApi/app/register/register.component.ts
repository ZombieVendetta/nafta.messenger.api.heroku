import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { RegisterForm } from '../models/registerForm';

@Component({
    selector: 'register',    
    styleUrls: ['app/register/register.component.css'],
    template: `
<div class="outer">
    <h1>SIGN UP</h1>
    <div class="inner">
        <div class="elements">
            <input [(ngModel)]="form.Email" type="text" class="text" placeholder="Email address" />
            <input [(ngModel)]="form.Password" type="password" class="text" placeholder="Password" />
            <input [(ngModel)]="form.ConfirmPassword" type="password" class="text" placeholder="Confirm Password" />
            <input [(ngModel)]="form.Name" type="text" class="text" placeholder="Name" />
            <input [(ngModel)]="form.Surname" type="text" class="text" placeholder="Surname" />
            <input [(ngModel)]="form.PhoneNumber" type="text" class="text" placeholder="Phone" />
            <input [(ngModel)]="form.BornDate" id="datepicker" class="text" placeholder="Born date" />
            <div class="radio-b">
                <input [(ngModel)]="form.Sex" name="sex" type="radio" id="r1" value="Female">
                <label for="r1">Female</label>
                <input [(ngModel)]="form.Sex" name="sex" type="radio" id="r2" value="Male" checked>
                <label for="r2">Male</label>
            </div>
            <button (click)="signUp(form)" class="button">SIGN UP</button>
        </div>
    </div>
</div>`,
    providers: [HttpService]
})

export class RegisterComponent {
    form: RegisterForm = new RegisterForm();

    constructor(private httpService: HttpService, private router: Router) { }

    signUp(form: RegisterForm) {        
        this.httpService.post('/api/Account/Register', JSON.stringify(form));
        this.router.navigate([{ outlets: { primary: ['login'] } }], { skipLocationChange: true });
    }
}