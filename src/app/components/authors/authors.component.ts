import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Authors } from 'src/app/Models/interfaces';

import { AuthorsService } from '../../services/authors.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Authors>();
  isError: string = null;
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar, private blogS: AuthorsService) {}

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

  public forDelete(id: string) {
    console.log(id);
    if (confirm('Are you sure ??')) {
      this.blogS
        .deleteAuthor(id)
        .then(() => {
          //? after deleting author
          this.snackBar.open('Author deleted successfully !', 'undo', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
        .catch((err) => (this.isError = err));
    }
  }
}
