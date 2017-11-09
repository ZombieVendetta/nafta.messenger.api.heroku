import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    template: `
<div class="appContainer">
    <div class="appTop">
        <router-outlet name="navBar"></router-outlet>
    </div>
    <div class="appLeft">
        <router-outlet name="leftBar"></router-outlet>
    </div>
    <div class="appCenter">
        <router-outlet name="general"></router-outlet>
    </div>
</div>
<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        if (!localStorage.getItem('access_token'))
            this.router.navigate([{ outlets: { primary: ['login'], navBar: null, leftBar: null, general: null } }], { skipLocationChange: true });
        else
            this.router.navigate([{ outlets: { navBar: ['nav'], leftBar: ['chats'] } }], { skipLocationChange: true });
    }
}