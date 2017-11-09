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
var registerForm_1 = require("../models/registerForm");
var RegisterComponent = (function () {
    function RegisterComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.form = new registerForm_1.RegisterForm();
    }
    RegisterComponent.prototype.signUp = function (form) {
        this.httpService.post('/api/Account/Register', JSON.stringify(form));
        this.router.navigate([{ outlets: { primary: ['login'] } }], { skipLocationChange: true });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        styleUrls: ['app/register/register.component.css'],
        template: "\n<div class=\"outer\">\n    <h1>SIGN UP</h1>\n    <div class=\"inner\">\n        <div class=\"elements\">\n            <input [(ngModel)]=\"form.Email\" type=\"text\" class=\"text\" placeholder=\"Email address\" />\n            <input [(ngModel)]=\"form.Password\" type=\"password\" class=\"text\" placeholder=\"Password\" />\n            <input [(ngModel)]=\"form.ConfirmPassword\" type=\"password\" class=\"text\" placeholder=\"Confirm Password\" />\n            <input [(ngModel)]=\"form.Name\" type=\"text\" class=\"text\" placeholder=\"Name\" />\n            <input [(ngModel)]=\"form.Surname\" type=\"text\" class=\"text\" placeholder=\"Surname\" />\n            <input [(ngModel)]=\"form.PhoneNumber\" type=\"text\" class=\"text\" placeholder=\"Phone\" />\n            <input [(ngModel)]=\"form.BornDate\" id=\"datepicker\" class=\"text\" placeholder=\"Born date\" />\n            <div class=\"radio-b\">\n                <input [(ngModel)]=\"form.Sex\" name=\"sex\" type=\"radio\" id=\"r1\" value=\"Female\">\n                <label for=\"r1\">Female</label>\n                <input [(ngModel)]=\"form.Sex\" name=\"sex\" type=\"radio\" id=\"r2\" value=\"Male\" checked>\n                <label for=\"r2\">Male</label>\n            </div>\n            <button (click)=\"signUp(form)\" class=\"button\">SIGN UP</button>\n        </div>\n    </div>\n</div>",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map