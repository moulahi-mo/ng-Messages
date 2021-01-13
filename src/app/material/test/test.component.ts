import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Message } from '../../Models/interfaces';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  hide = true;
  favoriteSeason: string;
  messages: Message[];
  message: Message;
  userForm: FormGroup;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  constructor(
    private msg: MessagesService,
    private _flashMessagesService: FlashMessagesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.msg.getMessages().subscribe((res) => {
      console.log(res);
      this.messages = res;
    });

    this._flashMessagesService.show('data fetched', {
      cssClass: 'alert-warning rounded-0 text-center lead',
      timeout: 5000,
    });

    this.userForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      amount: new FormControl(null, Validators.required),
    });
  }
  public onSubmit() {
    console.log(this.userForm.value);

    this.msg.addMessage(this.userForm.value);

    this.userForm.reset();
  }

  public onDelete(id: string) {
    this.msg.deleteMessage(id);
  }
  public onUpdate(msg: Message) {
    msg.date = new Date();
    this.msg.updateMessage(msg).subscribe((data) => {
      this._flashMessagesService.show('data updated', {
        cssClass: 'alert alert-success rounded-0 text-center lead',
        timeout: 4000,
      });
    });
  }
  public onSet(id: string) {
    const msg = {
      id: id,
      name: 'naimejahch',
      amount: 56,
    };
    this.msg.setMessage(msg);
  }
}
