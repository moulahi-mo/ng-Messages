import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewsComponent } from './components/news/news.component';

import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AccountComponent } from './components/account/account.component';
import { PostsComponent } from './components/posts/posts.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorsAddComponent } from './components/authors-add/authors-add.component';
import { AuthorsEditComponent } from './components/authors-edit/authors-edit.component';
import { AuthorsDetailsComponent } from './components/authors-details/authors-details.component';
import { PostAsideComponent } from './components/post-aside/post-aside.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },

  {
    path: 'posts',
    component: PostsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'posts/edit/:id',
    component: PostEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/add',
    component: PostAddComponent,
    canActivate: [AuthGuard],
  },
  { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
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
  {
    path: 'authors/:id',
    component: AuthorsDetailsComponent,
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
