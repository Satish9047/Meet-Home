import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../core/services/house.service';
import { IHouse } from '../../core/interface/app';
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
  house: undefined | IHouse;
  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
  ) {}
  ngOnInit() {
    this.houseId = Number(this.route.snapshot.params['id']);

    if (this.houseId) {
      this.houseService.getHouseById(this.houseId).subscribe((data) => {
        this.house = data;
      });
    }
  }
}
