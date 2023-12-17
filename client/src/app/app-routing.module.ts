import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ChatListComponent} from "./chat/chat-list/chat-list.component";
import {ChatDetailComponent} from "./chat/chat-detail/chat-detail.component";

const routes: Routes = [
  {path:'', component: ChatListComponent},
  {path: 'login', component: LoginComponent},
  { path: 'chat/:id', component: ChatDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
