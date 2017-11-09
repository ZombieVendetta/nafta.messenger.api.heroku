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
var http_service_1 = require("../http.service");
var SearchComponent = (function () {
    function SearchComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.users = [];
        this.friends = [];
        this.error = null;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpService.get('/api/users/')
            .subscribe(function (data) { return _this.friends = data; });
        var self = this;
        $('#s').on('keyup', function () {
            self.error = null;
            self.httpService.get(self.url + self.srch)
                .subscribe(function (data) { return self.users = data; }, function (error) { self.error = "Can not find this information"; });
        });
    };
    SearchComponent.prototype.searchWay = function (friendId) {
        var _this = this;
        this.error = null;
        this.httpService.get('/api/users/algorithm/' + friendId)
            .subscribe(function (data) { return _this.users = data; }, function (error) { _this.error = "Can not find the path to this user"; });
    };
    SearchComponent.prototype.onSelect = function (selected) {
        this.router.navigate([{ outlets: { general: ['profile', selected.Id] } }], { skipLocationChange: true });
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        styleUrls: ['app/search/search.component.css'],
        template: "\n<div class=\"searchOuter\">\n    <div class=\"searchHeader\">\n        <div class=\"searchSearch\">\n            <select [(ngModel)]=\"url\">\n                <option value=\"/api/users/login/\">Search users by email</option>\n                <option value=\"/api/users/name/\">Search users by name</option>\n                <option value=\"/api/users/surname/\">Search users by surname</option>\n                <option value=\"/api/users/phone/\">Search users by phone number</option>                \n            </select>\n            <input [(ngModel)]=\"srch\" type=\"text\" id=\"s\" name=\"srch\" placeholder=\"Enter search parameter\" />\n            <h4>Shortest way between users</h4>\n            <select [(ngModel)]=\"friendId\">\n                <option *ngFor=\"let friend of friends\" (click)=searchWay(friend.Id)>{{friend.Email}}</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"searchContent\">\n        <div class=\"searchOutput\">\n            <h3>Search output:</h3>\n            <p *ngIf=\"error != null\">{{error}}</p>\n            <ul>\n                <ng-container *ngIf=\"error == null\">\n                    <li *ngFor=\"let user of users\" (click)=onSelect(user)>\n                        <p>{{user.Email}}: {{user.Name}} {{user.Surname}}</p>\n                    </li>\n                </ng-container>\n            </ul>\n        </div>\n    </div>\n</div>",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map