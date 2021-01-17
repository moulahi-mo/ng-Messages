import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewsComponent } from './components/news/news.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AccountComponent } from './components/account/account.component';
import { PostsComponent } from './components/posts/posts.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorsAddComponent } from './components/authors-add/authors-add.component';
import { AuthorsEditComponent } from './components/authors-edit/authors-edit.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'inbox', component: InboxComponent }],
  },
  {
    path: 'authors/add',
    component: AuthorsAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'authors/edit/:id',
    component: AuthorsEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent, data: { title: 'about me' } },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
