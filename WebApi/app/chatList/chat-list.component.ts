import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Chat } from '../models/chat';
import { Router } from '@angular/router';

@Component({
    selector: 'chatList',
    styleUrls: ['app/chatList/chat-list.component.css'],
    template: `
<div class="chatListMain">
    <div id="chats" class="chatListChats">
        <ul>
            <li *ngFor="let chat of chats" (click)=onSelect(chat)>
                <p>{{chat.Name}}</p>
            </li>
        </ul>
    </div>
</div>`,
    providers: [HttpService]
})

export class ChatListComponent implements OnInit {
    private chats: Chat[] = [];

    constructor(private httpService: HttpService, private router: Router) { }

    ngOnInit() {
        this.httpService.get('/api/chats')
            .subscribe(data => this.chats = data);
    }

    onSelect(selected: Chat) {
        this.router.navigate([{ outlets: { general: ['chat', selected.Id] } }], { skipLocationChange: true });
    }
}