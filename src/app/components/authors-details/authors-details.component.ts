import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authors } from 'src/app/Models/interfaces';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-authors-details',
  templateUrl: './authors-details.component.html',
  styleUrls: ['./authors-details.component.scss'],
})
export class AuthorsDetailsComponent implements OnInit {
  activeAuthor: Authors;
  hide: boolean = true;
  index: string = null;
  constructor(
    private active: ActivatedRoute,
    private AuthorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    const id = this.active.snapshot.paramMap.get('id');
    this.index = id;
    this.getAuthorInfos(id);
  }
  public getAuthorInfos(id: string) {
    this.AuthorsService.getAuthorById(id).subscribe((data) => {
      this.activeAuthor = data;
    });
  }
}
