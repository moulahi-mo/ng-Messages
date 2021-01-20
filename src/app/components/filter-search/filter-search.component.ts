import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss'],
})
export class FilterSearchComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  searchForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      term: new FormControl(null),
    });
  }
  //! search inside articles
  public onSubmit() {
    let val = this.searchForm.value.term.toLowerCase().trim();
    this.onSearch.emit(val);
    console.log(val, 'is her');
  }
}
