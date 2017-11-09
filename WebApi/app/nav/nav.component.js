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
var router_1 = require("@angular/router");
var auth_service_1 = require("../auth.service");
var http_service_1 = require("../http.service");
var NavComponent = (function () {
    function NavComponent(httpService, authService, router) {
        this.httpService = httpService;
        this.authService = authService;
        this.router = router;
        this.Email = localStorage.getItem('userName');
        this.friends = [];
        this.show = false;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpService.get('/api/users/current')
            .subscribe(function (data) {
            localStorage.setItem('userId', data.Id);
            _this.onSelectProfile();
        });
        this.httpService.get('/api/users/role').subscribe(function (data) { return _this.show = data == 'admin'; });
    };
    NavComponent.prototype.onSelectProfile = function () {
        this.router.navigate([{ outlets: { general: ['profile', localStorage.getItem('userId')] } }], { skipLocationChange: true });
    };
    NavComponent.prototype.onSelectFriends = function (friendId) {
        $("#frList").prop('selectedIndex', 0);
        this.router.navigate([{ outlets: { general: ['profile', friendId] } }], { skipLocationChange: true });
    };
    NavComponent.prototype.refreshFriendList = function () {
        var _this = this;
        this.httpService.get('/api/friends/')
            .subscribe(function (data) { return _this.friends = data; });
    };
    NavComponent.prototype.logOut = function () {
        if (localStorage.getItem('access_token'))
            this.authService.logOut();
    };
    return NavComponent;
}());
NavComponent = __decorate([
    core_1.Component({
        selector: 'nav',
        styleUrls: ['app/nav/nav.component.css'],
        template: "\n<div class=\"navHeader\">\n    <div class=\"navInner\">\n        <a class=\"left\" (click)=\"onSelectProfile()\">{{Email}}</a>\n        <a class=\"left\" href=\"/swagger/ui/index\" *ngIf=\"show\">Swagger</a>\n        <a class=\"left\" [routerLink]=\"['/', { outlets: { general: ['search'] }}]\" routerLinkActive=\"active\" skipLocationChange>Search</a>\n        <select class=\"left\" id=\"frList\" (click)=refreshFriendList()>\n            <option value=\"\" default selected>Friend list</option>\n            <option disabled *ngIf=\"friends.length == 0\"></option>\n            <ng-container *ngFor=\"let friend of friends\">\n                <option (click)=onSelectFriends(friend.Id)>{{friend.Name}} {{friend.Surname}}</option>\n            </ng-container>\n        </select>\n        <a class=\"right\" id=\"lOut\" (click)=\"logOut()\">LOG OUT</a>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService, auth_service_1.AuthService, router_1.Router])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map