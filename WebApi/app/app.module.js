"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app.routing.module");
var app_route_reuse_strategy_1 = require("./app.route-reuse.strategy");
//services
var http_service_1 = require("./http.service");
var auth_service_1 = require("./auth.service");
//components
var app_component_1 = require("./app.component");
var chat_component_1 = require("./chat/chat.component");
var chat_list_component_1 = require("./chatList/chat-list.component");
var login_component_1 = require("./login/login.component");
var profile_component_1 = require("./profile/profile.component");
var register_component_1 = require("./register/register.component");
var search_component_1 = require("./search/search.component");
var nav_component_1 = require("./nav/nav.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule],
        declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, chat_component_1.ChatComponent, chat_list_component_1.ChatListComponent,
            profile_component_1.ProfileComponent, search_component_1.SearchComponent, register_component_1.RegisterComponent, nav_component_1.NavComponent],
        providers: [
            http_service_1.HttpService, auth_service_1.AuthService,
            { provide: router_1.RouteReuseStrategy, useClass: app_route_reuse_strategy_1.CustomReuseStrategy }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map