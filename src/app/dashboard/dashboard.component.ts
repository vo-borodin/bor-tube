import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { FavoritesListComponent } from '../favoriteslist/favoriteslist.component';

@Component({
  selector: 'qs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private _titleService: Title) {
  }

  ngOnInit() {
    this._titleService.setTitle( 'Covalent BorTube' );
  }
}
