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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_constants_1 = require("./app.constants");
var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
    }
    AuthService.prototype.login = function (url, form) {
        var _this = this;
        var body = "username=" + form.Email + "&password=" + form.Password + "&grant_type=password";
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(app_constants_1.CONFIGURATION.baseUrls.server + url, body, { headers: headers }).subscribe(function (response) {
            localStorage.setItem('access_token', response.json().access_token);
            localStorage.setItem('expires_in', response.json().expires_in);
            localStorage.setItem('token_type', response.json().token_type);
            localStorage.setItem('userName', response.json().userName);
            _this.router.navigate([{ outlets: { primary: ['home'] } }], { skipLocationChange: true });
            alert("Login successful");
        }, function (error) {
            alert("Wrong login or password. Try again");
        });
    };
    AuthService.prototype.logOut = function () {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        this.router.navigate([{ outlets: { primary: ['login'], navBar: null, leftBar: null, general: null } }], { skipLocationChange: true });
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map