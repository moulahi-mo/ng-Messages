import { NgModule } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { AuthorsService } from '../services/authors.service';
import { FavoritesService } from '../services/favorites.service';
import { FireStorageService } from '../services/fire-storage.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MessagesService } from '../services/messages.service';
import { NewsApiService } from '../services/news-api.service';
import { PostsService } from '../services/posts.service';
import { SettingsService } from '../services/settings.service';
import { UsersService } from '../services/users.service';
import { WheatherService } from '../services/wheather.service';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';

@NgModule({
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
    WheatherService,
    AdminGuard,
  ],
})
export class CoreModule {}
