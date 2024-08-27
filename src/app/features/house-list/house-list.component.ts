import { NgFor } from '@angular/common';
import { House } from '../../core/interface/app';
import { HouseService } from './../../core/services/house.service';
import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [NgFor, NgOptimizedImage, RouterModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css',
})
export class HouseListComponent implements OnInit {
  isLoading: boolean = true;
  // houseList: House[] = [];
  filteredHouse: House[] = [];
  constructor(
    private houseService: HouseService,
    private searchService: SearchService,
  ) {}
  ngOnInit() {
    this.houseService.getAllHouses().subscribe((responseData) => {
      console.log('from house list', responseData.data.houses);

      this.filteredHouse = responseData.data.houses;
      this.isLoading = false;
    });
  }
}

// this.houses = this.houseService.getAllHouses();

//     this.searchService.search$.subscribe((search) => {
//       if (search) {
//         this.filteredHouse = this.houses.filter((house) =>
//           house.house.toLowerCase().includes(search.toLowerCase()),
//         );
//         console.log(this.filteredHouse);
//       } else {
//         this.filteredHouse = this.houses;
//       }
//     });
