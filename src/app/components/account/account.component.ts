import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  activeUser: User;
  hide: boolean = true;
  constructor(private usersService: UsersService, private auth: AuthService) {}

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
          city: infos.personal.age,
          disponibility: infos.personal.disponibility.toDate(),
        },

        hobbies: infos.hobbies,
      };
    });
  }
}
