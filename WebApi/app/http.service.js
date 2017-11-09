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
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var app_constants_1 = require("./app.constants");
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.headers = new http_2.Headers({
            'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        });
    }
    HttpService.prototype.get = function (url) {
        return this.http.get(app_constants_1.CONFIGURATION.baseUrls.server + url, { headers: this.headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    HttpService.prototype.post = function (url, body, head) {
        if (head === void 0) { head = null; }
        if (head != null)
            this.headers.set('Content-Type', head);
        return this.http.post(app_constants_1.CONFIGURATION.baseUrls.server + url, body, { headers: this.headers })
            .map(function (resp) { return resp.json(); }).subscribe();
    };
    HttpService.prototype.put = function (url, body) {
        return this.http.put(app_constants_1.CONFIGURATION.baseUrls.server + url, body, { headers: this.headers })
            .map(function (resp) { return resp.json(); }).subscribe();
    };
    HttpService.prototype.delete = function (url) {
        this.http.delete(app_constants_1.CONFIGURATION.baseUrls.server + url, { headers: this.headers })
            .map(function (resp) { return resp.json(); }).subscribe();
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map