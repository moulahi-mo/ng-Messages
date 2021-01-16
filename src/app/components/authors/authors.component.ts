import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Authors>();
  isError: string = null;
  idToAnimate: string = null;
  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'joind',
    'status',
    'city',
    'details',
  ];
  listAuthors: Authors[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  rowToAnimate: string;
  sub: Subscription;
  constructor(private snackBar: MatSnackBar, private blogS: AuthorsService) {}

  ngOnInit(): void {
    this.getAuthors();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sub = this.blogS.EditedId.subscribe((id) => {
      this.rowToAnimate = id;
    });
    console.log(this.rowToAnimate);
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

  public forDelete(id: string, name: string) {
    console.log(id);
    if (confirm('Are you sure ??')) {
      this.blogS
        .deleteAuthor(id)
        .then(() => {
          //? after deleting author
          this.snackBar.open(`${name} deleted successfully !`, 'undo', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
        .catch((err) => (this.isError = err));
    }
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
