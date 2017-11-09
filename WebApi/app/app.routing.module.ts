import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { AppComponent } from './app.component'
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chatList/chat-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
    { path: 'home', component: AppComponent, outlet: 'primary' },
    { path: 'chat/:id', component: ChatComponent, outlet: 'general' },
    { path: 'chats', component: ChatListComponent, outlet: 'leftBar' },
    { path: 'login', component: LoginComponent, outlet: 'primary' },
    { path: 'nav', component: NavComponent, outlet: 'navBar' },
    { path: 'profile/:id', component: ProfileComponent, outlet: 'general' },
    { path: 'register', component: RegisterComponent, outlet: 'primary' },
    { path: 'search', component: SearchComponent, outlet: 'general' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }