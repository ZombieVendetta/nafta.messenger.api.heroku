"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./app.component");
var chat_component_1 = require("./chat/chat.component");
var chat_list_component_1 = require("./chatList/chat-list.component");
var login_component_1 = require("./login/login.component");
var profile_component_1 = require("./profile/profile.component");
var register_component_1 = require("./register/register.component");
var search_component_1 = require("./search/search.component");
var not_found_component_1 = require("./notFound/not-found.component");
exports.routes = [
    //{
    //    path: "",
    //    redirectTo: "",
    //    pathMatch: "full"
    //},
    {
        path: "",
        component: app_component_1.AppComponent
    },
    {
        path: "login",
        component: login_component_1.LoginComponent
    },
    {
        path: "register",
        component: register_component_1.RegisterComponent
    },
    {
        path: "chat/:id",
        component: chat_component_1.ChatComponent
    },
    {
        path: "chats",
        component: chat_list_component_1.ChatListComponent
    },
    {
        path: "profile",
        component: profile_component_1.ProfileComponent
    },
    {
        path: "search",
        component: search_component_1.SearchComponent
    },
    {
        path: "**",
        component: not_found_component_1.NotFoundComponent
    }
];
//# sourceMappingURL=app.routes.js.map