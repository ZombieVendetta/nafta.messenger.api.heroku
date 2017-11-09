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
var loginForm_1 = require("../models/loginForm");
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.form = new loginForm_1.LoginForm();
    }
    LoginComponent.prototype.signIn = function (form) {
        this.authService.login('/Token', this.form);
    };
    LoginComponent.prototype.signUp = function () {
        this.router.navigate([{ outlets: { primary: ['register'] } }], { skipLocationChange: true });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        styleUrls: ['app/login/login.component.css'],
        template: "\n<div class=\"outer\">\n    <h1>SIGN IN</h1>\n    <div class=\"inner\">\n        <div class=\"elements\">\n            <input type=\"text\" class=\"text\" placeholder=\"Email address\" [(ngModel)]=\"form.Email\" />\n            <input type=\"password\" class=\"text\" placeholder=\"Password\" [(ngModel)]=\"form.Password\" />\n            <button (click)=\"signIn(form)\" class=\"button\">SIGN IN</button>\n            <button (click)=\"signUp()\" class=\"button\">SIGN UP</button>\n        </div>\n    </div>\n</div>"
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map