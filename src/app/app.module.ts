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
  ],
  providers: [MessagesService, AuthService, AuthGuard, NewsApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
