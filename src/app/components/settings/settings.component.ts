import { Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('selectP') selectP: MatSelectionList;
  @ViewChild('settingForm') setForm: NgForm;
  listChoice: Settings;
  toppings = new FormControl();
  toppingList: string[] = [
    'Adding authors',
    'Editing authors',
    'Deleting authors',
    'Hide authors section',
  ];
  posts: string[] = [
    'Adding authors',
    'Editing authors',
    'Deleting authors',
    'Hide authors section',
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private set: SettingsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
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
}
