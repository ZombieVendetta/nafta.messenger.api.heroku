import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { User } from '../models/user';

@Component({
    selector: 'search',
    styleUrls: ['app/search/search.component.css'],
    template: `
<div class="searchOuter">
    <div class="searchHeader">
        <div class="searchSearch">
            <select [(ngModel)]="url">
                <option value="/api/users/login/">Search users by email</option>
                <option value="/api/users/name/">Search users by name</option>
                <option value="/api/users/surname/">Search users by surname</option>
                <option value="/api/users/phone/">Search users by phone number</option>                
            </select>
            <input [(ngModel)]="srch" type="text" id="s" name="srch" placeholder="Enter search parameter" />
            <h4>Shortest way between users</h4>
            <select [(ngModel)]="friendId">
                <option *ngFor="let friend of friends" (click)=searchWay(friend.Id)>{{friend.Email}}</option>
            </select>
        </div>
    </div>
    <div class="searchContent">
        <div class="searchOutput">
            <h3>Search output:</h3>
            <p *ngIf="error != null">{{error}}</p>
            <ul>
                <ng-container *ngIf="error == null">
                    <li *ngFor="let user of users" (click)=onSelect(user)>
                        <p>{{user.Email}}: {{user.Name}} {{user.Surname}}</p>
                    </li>
                </ng-container>
            </ul>
        </div>
    </div>
</div>`,
    providers: [HttpService]
})

export class SearchComponent implements OnInit {
    private users: User[] = [];
    private friends: User[] = [];
    private url: string;
    private srch: string;
    error: any = null;

    constructor(private httpService: HttpService, private router: Router) { }

    ngOnInit() {
        this.httpService.get('/api/users/')
            .subscribe(data => this.friends = data);

        var self = this;
        $('#s').on('keyup', function () {
            self.error = null;
            self.httpService.get(self.url + self.srch)
                .subscribe(
                data => self.users = data,
                error => { self.error = "Can not find this information"; }
                );
        });
    }

    searchWay(friendId: string) {
        this.error = null;
        this.httpService.get('/api/users/algorithm/' + friendId)
            .subscribe(
            data => this.users = data,
            error => { this.error = "Can not find the path to this user"; }
            );
    }

    onSelect(selected: User) {
        this.router.navigate([{ outlets: { general: ['profile', selected.Id] } }], { skipLocationChange: true });
    }
}