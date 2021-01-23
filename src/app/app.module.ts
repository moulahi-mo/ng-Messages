import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

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

import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { PostsService } from './services/posts.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FireStorageService } from './services/fire-storage.service';
import { WheatherComponent } from './components/wheather/wheather.component';
import { WheatherService } from './services/wheather.service';
import { AdminGuard } from './shared/admin.guard';
import { StoreModule } from '@ngrx/store';
import * as newReducer from './store/admin.reducer';
import { CoreModule } from './shared/core.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    SignupComponent,
    NavbarComponent,
    ToolbarComponent,

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

    FilterSearchComponent,
    WheatherComponent,
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
    StoreModule.forRoot({ adminR: newReducer.isAdminReducer }),
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
