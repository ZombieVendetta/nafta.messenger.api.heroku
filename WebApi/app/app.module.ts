import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module';
import { CustomReuseStrategy } from './app.route-reuse.strategy';

//services
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

//components
import { AppComponent } from './app.component'
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chatList/chat-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
    declarations: [AppComponent, LoginComponent, ChatComponent, ChatListComponent,
        ProfileComponent, SearchComponent, RegisterComponent, NavComponent],
    providers: [
        HttpService, AuthService,
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }