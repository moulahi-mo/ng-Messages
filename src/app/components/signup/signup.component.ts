import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Login, User } from '../../Models/interfaces';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('intro', [
      state(
        'fadeIn',
        style({
          opacity: 0,
        })
      ),
      state(
        'fadeOut',
        style({
          opacity: 1,
        })
      ),
      transition('fadeIn <=> fadeOut', animate(1500)),
    ]),
  ],
})
export class SignupComponent implements OnInit, AfterViewInit {
  fade: boolean = false;
  newUser: User;
  hide: boolean = true;
  hidec: boolean = true;
  signupForm: FormGroup;
  user: Login;
  hb: any;
  isError: string = null;
  isLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UsersService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,20}'
          ),
        ],
      ],
      confirm_password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,20}'
          ),
        ],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?.{9,}'),
        ],
      ],
      personal: this.fb.group({
        age: [null],
        city: [null],
        disponibility: [null],
      }),
      hobbies: this.fb.array([]),
    });
  }

  ngAfterViewInit() {
    this.fade = true;
  }

  public onHobby() {
    this.hb = this.signupForm.get('hobbies') as FormArray;
    this.hb.push(this.fb.control(''));
    console.log(this.hb);
    // this.hobbies.push(this.fb.control(''));
  }

  public onSubmit() {
    console.log(this.signupForm.value);

    console.log(this.newUser);
    this.isLoading = true;
    this.auth
      .signUp(
        this.signupForm.get('email').value,
        this.signupForm.get('password').value
      )
      .then((data) => {
        console.log(data, 'signup success');
        //! add new user to db after signup Ok
        this.newUser = {
          id: data.user.uid,
          name: this.signupForm.value.name,
          email: this.signupForm.get('email').value,
          password: this.signupForm.get('password').value,
          phone: this.signupForm.get('phone').value,
          personal: {
            age: this.signupForm.get('personal.age').value,
            city: this.signupForm.get('personal.city').value,
            disponibility: this.signupForm.get('personal.disponibility').value,
          },

          hobbies: this.signupForm.get('hobbies').value,
        };
        //! adding user
        this.userService.addUser(this.newUser).subscribe(() => {
          console.log('new user added ');
        });
        this.isLoading = false;
        //! show the snackbar
        this.snackBar.open(
          `Welcome! ${this.signupForm.get('name').value}`,
          'undo',
          {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }
        );
        this.route.navigate(['/']);
        this.signupForm.reset();
      })
      .catch((err) => {
        this.isError = err.message;
        this.isLoading = false;
      });
  }
}
