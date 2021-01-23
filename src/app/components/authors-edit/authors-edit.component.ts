import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthorsService } from 'src/app/services/authors.service';
declare global {
  interface Date {
    toDate: () => Date;
  }
}
@Component({
  selector: 'app-authors-edit',
  templateUrl: './authors-edit.component.html',
  styleUrls: ['./authors-edit.component.scss'],
})
export class AuthorsEditComponent implements OnInit, AfterViewInit {
  date: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  finalFormGroup: FormGroup;
  step1: {} = {};
  step2: {} = {};
  steps: any;
  statusList: [string, string, string] = ['standard', 'premium', 'vip'];
  index: string = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private authorService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.index = this.actRoute.snapshot.paramMap.get('id');

    //! init reactive forms
    this.firstFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      status: [null],
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
  ngAfterViewInit() {
    //! set values on the form

    this.getActualAuthor(this.index);
  }
  public getActualAuthor(id: string) {
    this.authorService.getAuthorById(id).subscribe((data) => {
      console.log(data);
      this.firstFormGroup.patchValue({
        email: data.email,
        isActive: data.isActive,
        joind: data.joind.toDate(),
        name: data.name,
        phone: data.phone,
        status: data.status,
        username: data.username,
        website: data.website,
      });
      this.secondFormGroup.patchValue({
        address: {
          city: data.address.city,

          street: data.address.street,

          zipcode: data.address.zipcode,
        },

        company: {
          catchPhrase: data.company.catchPhrase,
          name: data.company.name,
        },
      });
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
    // ! confirm edit and send it to db
    this.authorService.updateAuthor(this.steps, this.index).then(() => {
      console.log('updated');

      //? after adding to db
      this.snackBar.open(` ${this.steps.name} updated successfully !`, 'undo', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      //? reset forms
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      this.finalFormGroup.reset();
      //? navigate to authors page
      this.route.navigate(['/authors']);
    });
  }
}
