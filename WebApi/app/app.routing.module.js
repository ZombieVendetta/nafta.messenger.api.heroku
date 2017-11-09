"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//components
var app_component_1 = require("./app.component");
var chat_component_1 = require("./chat/chat.component");
var chat_list_component_1 = require("./chatList/chat-list.component");
var login_component_1 = require("./login/login.component");
var profile_component_1 = require("./profile/profile.component");
var register_component_1 = require("./register/register.component");
var search_component_1 = require("./search/search.component");
var nav_component_1 = require("./nav/nav.component");
var routes = [
    { path: 'home', component: app_component_1.AppComponent, outlet: 'primary' },
    { path: 'chat/:id', component: chat_component_1.ChatComponent, outlet: 'general' },
    { path: 'chats', component: chat_list_component_1.ChatListComponent, outlet: 'leftBar' },
    { path: 'login', component: login_component_1.LoginComponent, outlet: 'primary' },
    { path: 'nav', component: nav_component_1.NavComponent, outlet: 'navBar' },
    { path: 'profile/:id', component: profile_component_1.ProfileComponent, outlet: 'general' },
    { path: 'register', component: register_component_1.RegisterComponent, outlet: 'primary' },
    { path: 'search', component: search_component_1.SearchComponent, outlet: 'general' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.module.js.map