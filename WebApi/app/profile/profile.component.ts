/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/signalr/index.d.ts" />

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONFIGURATION } from '../app.constants';
import { HttpService } from '../http.service';
import { User } from '../models/user';
import { Chat } from "../models/chat";

@Component({
    selector: 'profile',
    styleUrls: ['app/profile/profile.component.css'],
    template: `
<div class="profileOuter">
    <div class="profileHeader">
        <div class="profileInfo">
            <h4>Contact info</h4>
        </div>
        <h3>{{user.Name}} {{user.Surname}}</h3>
        <button (click)="createChat()" id="crCht" class="button">Create chat</button>
        <button (click)="addFriend()" id="addFr" class="button">Add to friend</button>
        <button (click)="removeFriend()" id="reFr" class="button" style="display:none">Remove friend</button>
    </div>
    <div class="profileContent">
        <div class="profileData">
            <label class="userInf">{{user.Email}}</label>
            <label class="lbl">Email</label>
            <label class="userInf">{{user.PhoneNumber}}</label>
            <label class="lbl">Phone number</label>
            <label class="userInf">{{user.Sex}}</label>
            <label class="lbl">User's sex</label>
            <label class="userInf">{{user.BornDate}}</label>
            <label class="lbl">Born date</label>
        </div>
    </div>
</div>`,
    providers: [HttpService]
})

export class ProfileComponent implements OnInit {
    user: User = new User();
    private id: string = "";

    constructor(private httpService: HttpService, private router: Router, private aRouter: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.aRouter.snapshot.params['id'];
        this.hideBtn();

        this.httpService.get('/api/users/' + this.id)
            .subscribe(data => this.user = data);

        var self = this;
        var connection = $.hubConnection(CONFIGURATION.baseUrls.server);
        var chatHubProxy = connection.createHubProxy('ChatHub');
        chatHubProxy.on('addChat', function (name) {
            $("<p/>", {
                text: name,
                css: {
                    "cursor": "pointer"
                }
            }).append("<br/>").appendTo('#chats').on("click", function () {
                self.httpService.get('/api/chats/user/' + self.id)
                    .subscribe(data =>
                        self.router.navigate([{ outlets: { general: ['chat', (data as Chat).Id] } }], { skipLocationChange: true })
                    );
            });
        });

        connection.start().done(function () {
            $('#crCht').click(function (e) {
                var name = prompt('Enter chat name');
                $('#addFr').hide();
                $('#crCht').hide();
                self.httpService.post('/api/chats/create/' + name, "=" + self.id, "application/x-www-form-urlencoded");
                chatHubProxy.invoke('Create', self.id, name);
            });
        });

        $('#lOut').on('click', function () {
            connection.stop();
        });
    }

    private hideBtn() {
        if (localStorage.getItem('userId') == this.id) {
            $('#addFr').hide();
            $('#crCht').hide();
        }
        else {
            this.httpService.get('/api/friends/').subscribe(
                data => {
                    for (var friend of data) {
                        if (friend.Id == this.id) {
                            $('#addFr').hide();
                            $('#reFr').show();
                            break;
                        }
                    }
                }
            );
            this.httpService.get('/api/chats/user/' + this.id).subscribe(
                data => $('#crCht').hide(),
                error => $('#crCht').show());
        }
    }

    private addFriend() {
        $('#addFr').hide();
        $('#reFr').show();
        this.httpService.post('/api/friends/' + this.id, "");
    }

    private removeFriend() {
        $('#addFr').show();
        $('#crCht').show();
        $('#reFr').hide();
        this.httpService.delete('/api/friends/' + this.id);
    }
}