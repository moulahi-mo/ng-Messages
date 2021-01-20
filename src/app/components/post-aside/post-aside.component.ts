import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-aside',
  templateUrl: './post-aside.component.html',
  styleUrls: ['./post-aside.component.scss'],
})
export class PostAsideComponent implements OnInit {
  @Input() isAuth: boolean;
  constructor() {}

  ngOnInit(): void {}
}
