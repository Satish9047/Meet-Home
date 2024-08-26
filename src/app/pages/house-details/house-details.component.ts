import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../core/services/house.service';
import { House } from '../../core/interface/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [],
  templateUrl: './house-details.component.html',
  styleUrl: './house-details.component.css',
})
export class HouseDetailsComponent implements OnInit {
  houseId: number = 0;
  house: undefined | House;
  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
  ) {}
  ngOnInit() {
    this.houseId = this.route.snapshot.params['id'];
    console.log('from house detail', this.houseId);

    if (this.houseId) {
      console.log('from house detail', this.houseId);
      this.houseService.getHouseById(this.houseId).subscribe((responseData) => {
        console.log('from house detail', responseData);
        this.house = responseData.data;
      });
    }
  }
}
