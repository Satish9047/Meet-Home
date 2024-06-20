import { NgFor } from '@angular/common';
import { IHouse } from '../../core/interface/app';
import { HouseService } from './../../core/services/house.service';
import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [NgFor, NgOptimizedImage, RouterModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css',
})
export class HouseListComponent implements OnInit {
  houses: IHouse[] = [];
  constructor(private houseService: HouseService) {}
  ngOnInit() {
    this.houses = this.houseService.getAllHouses();
  }
}
