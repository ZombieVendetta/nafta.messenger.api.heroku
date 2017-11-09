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
var router_1 = require("@angular/router");
var app_constants_1 = require("../app.constants");
var http_service_1 = require("../http.service");
var user_1 = require("../models/user");
var ProfileComponent = (function () {
    function ProfileComponent(httpService, router, aRouter) {
        this.httpService = httpService;
        this.router = router;
        this.aRouter = aRouter;
        this.user = new user_1.User();
        this.id = "";
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.aRouter.snapshot.params['id'];
        this.hideBtn();
        this.httpService.get('/api/users/' + this.id)
            .subscribe(function (data) { return _this.user = data; });
        var self = this;
        var connection = $.hubConnection(app_constants_1.CONFIGURATION.baseUrls.server);
        var chatHubProxy = connection.createHubProxy('ChatHub');
        chatHubProxy.on('addChat', function (name) {
            $("<p/>", {
                text: name,
                css: {
                    "cursor": "pointer"
                }
            }).append("<br/>").appendTo('#chats').on("click", function () {
                self.httpService.get('/api/chats/user/' + self.id)
                    .subscribe(function (data) {
                    return self.router.navigate([{ outlets: { general: ['chat', data.Id] } }], { skipLocationChange: true });
                });
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
    };
    ProfileComponent.prototype.hideBtn = function () {
        var _this = this;
        if (localStorage.getItem('userId') == this.id) {
            $('#addFr').hide();
            $('#crCht').hide();
        }
        else {
            this.httpService.get('/api/friends/').subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var friend = data_1[_i];
                    if (friend.Id == _this.id) {
                        $('#addFr').hide();
                        $('#reFr').show();
                        break;
                    }
                }
            });
            this.httpService.get('/api/chats/user/' + this.id).subscribe(function (data) { return $('#crCht').hide(); }, function (error) { return $('#crCht').show(); });
        }
    };
    ProfileComponent.prototype.addFriend = function () {
        $('#addFr').hide();
        $('#reFr').show();
        this.httpService.post('/api/friends/' + this.id, "");
    };
    ProfileComponent.prototype.removeFriend = function () {
        $('#addFr').show();
        $('#crCht').show();
        $('#reFr').hide();
        this.httpService.delete('/api/friends/' + this.id);
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        styleUrls: ['app/profile/profile.component.css'],
        template: "\n<div class=\"profileOuter\">\n    <div class=\"profileHeader\">\n        <div class=\"profileInfo\">\n            <h4>Contact info</h4>\n        </div>\n        <h3>{{user.Name}} {{user.Surname}}</h3>\n        <button (click)=\"createChat()\" id=\"crCht\" class=\"button\">Create chat</button>\n        <button (click)=\"addFriend()\" id=\"addFr\" class=\"button\">Add to friend</button>\n        <button (click)=\"removeFriend()\" id=\"reFr\" class=\"button\" style=\"display:none\">Remove friend</button>\n    </div>\n    <div class=\"profileContent\">\n        <div class=\"profileData\">\n            <label class=\"userInf\">{{user.Email}}</label>\n            <label class=\"lbl\">Email</label>\n            <label class=\"userInf\">{{user.PhoneNumber}}</label>\n            <label class=\"lbl\">Phone number</label>\n            <label class=\"userInf\">{{user.Sex}}</label>\n            <label class=\"lbl\">User's sex</label>\n            <label class=\"userInf\">{{user.BornDate}}</label>\n            <label class=\"lbl\">Born date</label>\n        </div>\n    </div>\n</div>",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router, router_1.ActivatedRoute])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map