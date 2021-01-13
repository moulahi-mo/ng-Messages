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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup;
  user: Login;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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
    console.log(this.loginForm.value);
    this.auth
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .then((data) => {
        console.log(data, 'auth success');
        this._flashMessagesService.show('login OK', {
          cssClass: 'alert alert-success rounded-0 text-center lead',
          timeout: 4000,
        });
        this.route.navigate(['/']);
      })
      .catch((err) => err.message);
  }
}
