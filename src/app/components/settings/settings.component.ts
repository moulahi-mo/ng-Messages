import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { MatSelect } from '@angular/material/select';
import { Settings } from 'src/app/Models/interfaces';
import { SettingsService } from 'src/app/services/settings.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { fromEvent, Observable, Subscription } from 'rxjs';
let widthListner = fromEvent(window, 'resize');
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('selectP') selectP: MatSelectionList;
  @ViewChild('settingForm') setForm: NgForm;
  listChoice: Settings;
  toppings = new FormControl();
  changeFlex: number = 2;
  unsb: Subscription;
  // widthListner:Observable<number>;

  toppingList: string[] = [
    'Adding authors',
    'Editing authors',
    'Deleting authors',
    'Hide authors section',
  ];
  posts: string[] = [
    'Adding posts',
    'Editing posts',
    'Deleting posts',
    'Hide posts section',
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private set: SettingsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.unsb = widthListner.subscribe((data) => {
      if (data.target.innerWidth < 600) {
        this.changeFlex = 1;
      } else {
        this.changeFlex = 2;
      }
    });

    this.listChoice = {
      registration: null,
      authors: [],
      posts: [],
      title: null,
    };
    //! init settings
    this.getMySettings();
  }

  public fire(post: string) {
    console.log(post, this.selectP._value);
  }

  public onSubmit(form: NgForm) {
    console.log(form.value);
    this.set
      .addSettings(form.value)
      .then(() => {
        console.log('settings added');
        //!show the message snackbar
        this.snackBar.open('settings updated successfully !', 'undo', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
      .catch((err) => err);
  }

  public getMySettings() {
    this.set.getSettings().subscribe((data) => {
      // this.listChoice=data;
      //! set new sttings value from db
      this.setForm.setValue(data);
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
