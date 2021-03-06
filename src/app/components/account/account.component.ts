import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  activeUser: User;
  hide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private usersService: UsersService,
    private auth: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //! get the user uid first and call get user account info then
    this.auth.authState().subscribe((user) => {
      if (user) {
        this.initAccount(user.uid);
      }
    });

    this.activeUser = {
      id: null,
      name: null,
      email: null,
      password: null,
      phone: null,
      personal: {
        age: null,
        city: null,
        disponibility: null,
      },

      hobbies: [],
    };
  }

  public initAccount(id: string) {
    this.usersService.getUser(id).subscribe((infos) => {
      console.log(infos, id);

      this.activeUser = {
        id: infos.id,
        name: infos.name,
        email: infos.email,
        password: infos.password,
        phone: infos.phone,
        personal: {
          age: infos.personal.age,
          city: infos.personal.city,
          disponibility: infos.personal.disponibility.toDate(),
        },

        hobbies: infos.hobbies,
      };
    });
  }

  public removeAccount(id: string) {
    if (confirm('Are you sure you want that??')) {
      this.usersService.removeUser(id).then(() => {
        this.snackBar.open(
          `Goodbye ${this.activeUser.name} see you later !!`,
          'undo',
          {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }
        );
        this.route.navigate(['/']);
      });
    }
  }
}
