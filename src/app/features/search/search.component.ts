import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchForm: FormGroup;
  constructor() {
    this.searchForm = new FormGroup({
      searchText: new FormControl(''),
    });
  }
  handleSearch() {
    console.log('hello search');
    console.log(this.searchForm.value);
  }
}
