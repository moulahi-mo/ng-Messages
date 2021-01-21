import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../Models/interfaces';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup;
  user: Login;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isError: string = null;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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
    });
  }
  public onSubmit() {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.auth
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .then((data) => {
        console.log(data, 'auth success');

        this.isLoading = false;
        this.route.navigate(['/']);
        this.snackBar.open(
          `Welcome back ! ${this.loginForm.get('email').value}`,
          'undo',
          {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }
        );
        this.loginForm.reset();
      })
      .catch((err) => {
        this.isLoading = false;

        this.isError = err.message;
      });
  }
}
