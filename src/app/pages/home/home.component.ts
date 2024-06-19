import { Component } from '@angular/core';
import { SearchComponent } from '../../features/search/search.component';
import { HouseListComponent } from '../../features/house-list/house-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, HouseListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
