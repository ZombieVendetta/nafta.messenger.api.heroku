import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { User } from '../models/user';

@Component({
    selector: 'nav',
    styleUrls: ['app/nav/nav.component.css'],
    template: `
<div class="navHeader">
    <div class="navInner">
        <a class="left" (click)="onSelectProfile()">{{Email}}</a>
        <a class="left" href="/swagger/ui/index" *ngIf="show">Swagger</a>
        <a class="left" [routerLink]="['/', { outlets: { general: ['search'] }}]" routerLinkActive="active" skipLocationChange>Search</a>
        <select class="left" id="frList" (click)=refreshFriendList()>
            <option value="" default selected>Friend list</option>
            <option disabled *ngIf="friends.length == 0"></option>
            <ng-container *ngFor="let friend of friends">
                <option (click)=onSelectFriends(friend.Id)>{{friend.Name}} {{friend.Surname}}</option>
            </ng-container>
        </select>
        <a class="right" id="lOut" (click)="logOut()">LOG OUT</a>
    </div>
</div>
`
})

export class NavComponent implements OnInit {
    private Email = localStorage.getItem('userName');
    private friends: User[] = [];
    private show: boolean = false;
    constructor(private httpService: HttpService, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.httpService.get('/api/users/current')
            .subscribe(data => {
                localStorage.setItem('userId', (data as User).Id);
                this.onSelectProfile();
            });

        this.httpService.get('/api/users/role').subscribe(data => this.show = (data as string) == 'admin');
    }

    onSelectProfile() {
        this.router.navigate([{ outlets: { general: ['profile', localStorage.getItem('userId')] } }], { skipLocationChange: true });
    }

    onSelectFriends(friendId: string) {
        $("#frList").prop('selectedIndex', 0);
        this.router.navigate([{ outlets: { general: ['profile', friendId] } }], { skipLocationChange: true });
    }

    refreshFriendList() {
        this.httpService.get('/api/friends/')
            .subscribe(data => this.friends = data);
    }

    logOut() {
        if (localStorage.getItem('access_token'))
            this.authService.logOut();
    }
}