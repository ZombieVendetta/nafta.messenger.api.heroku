/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/signalr/index.d.ts" />

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { Message } from '../models/message';
import { Chat } from '../models/chat';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from '@angular/http';
import { CONFIGURATION } from "../app.constants";

@Component({
    selector: 'chat',
    styleUrls: ['app/chat/chat.component.css'],
    template: `
<div class="chatOuter">
    <div class="chatHeader">
        <h2 (click)="goBack()">< Back</h2>
        <h3>{{chatName}}</h3>
    </div>
    <div id="log" class="chatContent">
        <ng-container *ngFor="let message of messages">            
            <div [ngStyle]="{'text-align': (message.UserId == authId)? 'right' : 'left'}">{{map.get(message.UserId)}}: {{message.Text}}</div><br>
        </ng-container>
    </div>
    <div class="chatFooter">
        <input type="text" (keyup.enter)="handle($event)" id="msg" class="txt" placeholder="\tWrite a message...">
    </div>
</div>`,
    providers: [HttpService]
})

export class ChatComponent implements OnInit, OnDestroy {
    private map: Map<string, string> = new Map<string, string>();
    private messages: Message[] = [];
    private memberId: string;
    private id: number;
    private chatName: string;
    private authId = localStorage.getItem('userId');
    private connection = $.hubConnection(CONFIGURATION.baseUrls.server);

    constructor(private httpService: HttpService, private aRouter: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.id = this.aRouter.snapshot.params['id'];
        this.httpService.get('/api/chats/' + this.id + "/members").subscribe(data => {
            for (let member of data) {
                this.map.set(member.Id, member.Email);

                if (member.Id != this.authId)
                    this.memberId = member.Id;
            }
        });

        this.httpService.get('/api/chats/' + this.id + "/messages").subscribe(data => this.messages = data);
        this.httpService.get('/api/chats/' + this.id).subscribe(data => this.chatName = (data as Chat).Name);        

        var self = this;
        var messageHubProxy = this.connection.createHubProxy('MainHub');
        messageHubProxy.connection.qs = { "User-Name": localStorage.getItem('userId') };
        messageHubProxy.on('addMessage', function (chatId, name, message) {
            if (self.id == chatId) {
                var align = (name == self.authId) ? "right" : "left";
                $("<div/>", {
                    text: self.map.get(name) + ": " + message,
                    css: {
                        "text-align": align
                    }
                }).append("<br/><br/>").appendTo('#log');
                $("#log").scrollTop($("#log")[0].scrollHeight);
            }
        });

        this.connection.start().done(function () {
            $('#msg').on('keyup', function (e) {
                if (e.which === 13) {
                    var msg = $('#msg').val();
                    messageHubProxy.invoke('SendChatMessage', self.id, self.authId, self.memberId, msg);
                    $('#msg').val('');
                }
            });
        });
    }

    private handle(event: any) {
        this.httpService.post('/api/chats/' + this.id + "/send", JSON.stringify(event.target.value));
    }

    private goBack() {
        this.router.navigate([{ outlets: { general: ['profile', localStorage.getItem('userId')] } }], { skipLocationChange: true });
    }

    ngOnDestroy() {
        this.connection.stop();
    }
}