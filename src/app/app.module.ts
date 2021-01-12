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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [MessagesService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
