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
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  signupForm: FormGroup;
  user: Login;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          // Validators.pattern(
          //   '(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{6,}'
          // ),
        ],
      ],
    });
  }
  public onSubmit() {
    console.log(this.signupForm.value);
    this.auth
      .signUp(
        this.signupForm.get('email').value,
        this.signupForm.get('password').value
      )
      .then((data) => {
        console.log(data, 'signup success');
        this._flashMessagesService.show('signup OK', {
          cssClass: 'alert alert-success rounded-0 text-center lead',
          timeout: 4000,
        });
        this.route.navigate(['/']);
      })
      .catch((err) => err.message);
  }
}
