import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.houseId = Number(this.route.snapshot.params['id']);
    console.log(this.houseId);
  }
}
