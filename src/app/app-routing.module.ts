import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewsComponent } from './components/news/news.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SettingsComponent } from './components/settings/settings.component';
const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
