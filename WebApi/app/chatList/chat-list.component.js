"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
var router_1 = require("@angular/router");
var ChatListComponent = (function () {
    function ChatListComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.chats = [];
    }
    ChatListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpService.get('/api/chats')
            .subscribe(function (data) { return _this.chats = data; });
    };
    ChatListComponent.prototype.onSelect = function (selected) {
        this.router.navigate([{ outlets: { general: ['chat', selected.Id] } }], { skipLocationChange: true });
    };
    return ChatListComponent;
}());
ChatListComponent = __decorate([
    core_1.Component({
        selector: 'chatList',
        styleUrls: ['app/chatList/chat-list.component.css'],
        template: "\n<div class=\"chatListMain\">\n    <div id=\"chats\" class=\"chatListChats\">\n        <ul>\n            <li *ngFor=\"let chat of chats\" (click)=onSelect(chat)>\n                <p>{{chat.Name}}</p>\n            </li>\n        </ul>\n    </div>\n</div>",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router])
], ChatListComponent);
exports.ChatListComponent = ChatListComponent;
//# sourceMappingURL=chat-list.component.js.map