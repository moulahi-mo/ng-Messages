import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/Models/interfaces';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoritesList: News[] = [];
  unsb: Subscription;
  isError: string = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private fav: FavoritesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fav.getFavorites().subscribe(
      (data) => {
        this.favoritesList = data;
      },
      (err) => (this.isError = err)
    );
    this.unsb = this.fav.emitFavorite.subscribe((num) => {
      console.log('heart', num);
    });
  }
  public removeFav(id: string) {
    this.fav.removeFavorite(id).subscribe(() => {
      //!show the message snackbar
      this.snackBar.open('removed from Favorites...', 'undo', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
}
