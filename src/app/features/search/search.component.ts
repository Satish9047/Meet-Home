import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchForm: FormGroup;
  constructor(private searchService: SearchService) {
    this.searchForm = new FormGroup({
      searchText: new FormControl(''),
    });
  }
  handleSearch() {
    console.log(this.searchForm.value);
    this.searchService.setSearch(this.searchForm.value);
  }
}
