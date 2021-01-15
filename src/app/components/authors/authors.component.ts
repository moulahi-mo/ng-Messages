import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Authors } from 'src/app/Models/interfaces';

import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Authors>();
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'joind',
    'phone',
    'isActive',
    'details',
  ];
  listAuthors: Authors[] = [];
  constructor(private blogS: AuthorsService) {}

  ngOnInit(): void {
    this.getAuthors();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getAuthors() {
    this.blogS.fetchAuthors().subscribe((data) => {
      console.log(data);
      this.listAuthors = data;
      this.dataSource.data = this.listAuthors;
    });
  }
  public onFiltring(term: string) {
    console.log(term);
    this.dataSource.filter = term;
  }
  public forEdit(el) {
    console.log(el);
  }
}
