import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Authors } from 'src/app/Models/interfaces';
import { AuthorsService } from 'src/app/services/authors.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authors-add',
  templateUrl: './authors-add.component.html',
  styleUrls: ['./authors-add.component.scss'],
})
export class AuthorsAddComponent implements OnInit {
  isError: string = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  finalFormGroup: FormGroup;
  step1: {} = {};
  step2: {} = {};
  steps: any;
  statusList: [string, string, string] = ['standard', 'premium', 'vip'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private route: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private AuthorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    //! init reactive forms
    this.firstFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      status: [''],
      isActive: [false, [Validators.required]],
      joind: [null],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp('[- +()0-9]+')),
          Validators.maxLength(13),
          Validators.minLength(13),
        ],
      ],
      website: [''],
    });
    this.secondFormGroup = this.fb.group({
      address: this.fb.group({
        street: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        zipcode: [''],
      }),
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
      }),
    });

    this.finalFormGroup = this.fb.group({
      agree: [null, Validators.required],
    });
  }

  //! forms submit

  public firstSubmit() {
    console.log(this.firstFormGroup.value);
    this.step1 = this.firstFormGroup.value;
  }
  public secondSubmit() {
    console.log(this.secondFormGroup.value);
    this.step2 = { ...this.secondFormGroup.value };
  }
  public finalSubmit() {
    this.steps = { ...this.step1, ...this.step2, created: new Date() };
    console.log(this.steps);
    //! add author to db
    this.AuthorsService.addAuthor(this.steps)
      .then((res) => {
        console.log(res, 'added to db');
        //? after adding to db
        this.snackBar.open(
          `${this.steps.name} is added successfully !`,
          'undo',
          {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }
        );
        //? reset forms
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.finalFormGroup.reset();
        //? navigate to authors page
        this.route.navigate(['/authors']);
      })
      .catch((err) => (this.isError = err));
  }
}
