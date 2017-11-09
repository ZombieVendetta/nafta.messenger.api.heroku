"use strict";
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/signalr/index.d.ts" />
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
var app_constants_1 = require("../app.constants");
var ChatComponent = (function () {
    function ChatComponent(httpService, aRouter, router) {
        this.httpService = httpService;
        this.aRouter = aRouter;
        this.router = router;
        this.map = new Map();
        this.messages = [];
        this.authId = localStorage.getItem('userId');
        this.connection = $.hubConnection(app_constants_1.CONFIGURATION.baseUrls.server);
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.aRouter.snapshot.params['id'];
        this.httpService.get('/api/chats/' + this.id + "/members").subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var member = data_1[_i];
                _this.map.set(member.Id, member.Email);
                if (member.Id != _this.authId)
                    _this.memberId = member.Id;
            }
        });
        this.httpService.get('/api/chats/' + this.id + "/messages").subscribe(function (data) { return _this.messages = data; });
        this.httpService.get('/api/chats/' + this.id).subscribe(function (data) { return _this.chatName = data.Name; });
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
    };
    ChatComponent.prototype.handle = function (event) {
        this.httpService.post('/api/chats/' + this.id + "/send", JSON.stringify(event.target.value));
    };
    ChatComponent.prototype.goBack = function () {
        this.router.navigate([{ outlets: { general: ['profile', localStorage.getItem('userId')] } }], { skipLocationChange: true });
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        this.connection.stop();
    };
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        selector: 'chat',
        styleUrls: ['app/chat/chat.component.css'],
        template: "\n<div class=\"chatOuter\">\n    <div class=\"chatHeader\">\n        <h2 (click)=\"goBack()\">< Back</h2>\n        <h3>{{chatName}}</h3>\n    </div>\n    <div id=\"log\" class=\"chatContent\">\n        <ng-container *ngFor=\"let message of messages\">            \n            <div [ngStyle]=\"{'text-align': (message.UserId == authId)? 'right' : 'left'}\">{{map.get(message.UserId)}}: {{message.Text}}</div><br>\n        </ng-container>\n    </div>\n    <div class=\"chatFooter\">\n        <input type=\"text\" (keyup.enter)=\"handle($event)\" id=\"msg\" class=\"txt\" placeholder=\"\tWrite a message...\">\n    </div>\n</div>",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService, router_1.ActivatedRoute, router_1.Router])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map