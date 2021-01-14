import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

const html = `
Pizza party!!! 🍕
`;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  @ViewChild('dg') dg: any;
  progress: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    //*progress spinner
    const t = setInterval(() => {
      this.progress += 5;
      if (this.progress === 105) {
        clearInterval(t);
        this.progress = 0;
      }
    }, 1000);
  }
  // * toggle messages
  toggle() {
    this.snackBar.open(html, 'undo', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
