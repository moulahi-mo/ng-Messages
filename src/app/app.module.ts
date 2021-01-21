import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { TestComponent } from './material/test/test.component';

import { MessagesService } from './services/messages.service';
import { AuthService } from './services/auth.service';
import { MaterialModule } from './shared/material.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { NewsComponent } from './components/news/news.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './shared/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewsApiService } from './services/news-api.service';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { AboutComponent } from './components/about/about.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AccountComponent } from './components/account/account.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { PostsComponent } from './components/posts/posts.component';
import { FavoritesService } from './services/favorites.service';
import { AuthorsService } from './services/authors.service';
import { SettingsService } from './services/settings.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthorsEditComponent } from './components/authors-edit/authors-edit.component';
import { AuthorsAddComponent } from './components/authors-add/authors-add.component';
import { UsersService } from './services/users.service';
import { AuthorsDetailsComponent } from './components/authors-details/authors-details.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostAsideComponent } from './components/post-aside/post-aside.component';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { PostsService } from './services/posts.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FireStorageService } from './services/fire-storage.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    TestComponent,
    SignupComponent,
    NavbarComponent,
    ToolbarComponent,
    InboxComponent,
    NewsComponent,
    SettingsComponent,
    NotFoundComponent,
    SearchBoxComponent,
    AboutComponent,
    FavoritesComponent,
    AccountComponent,
    AuthorsComponent,
    PostsComponent,
    AuthorsEditComponent,
    AuthorsAddComponent,
    AuthorsDetailsComponent,
    PostAddComponent,
    PostEditComponent,
    PostAsideComponent,
    FilterSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CKEditorModule,
    AngularFireStorageModule,
  ],
  providers: [
    MessagesService,
    AuthService,
    AuthGuard,
    NewsApiService,
    FavoritesService,
    AuthorsService,
    SettingsService,
    LocalStorageService,
    UsersService,
    PostsService,
    FireStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
