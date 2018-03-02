import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'favoriteslist',
  templateUrl: './favoriteslist.component.html',
  styleUrls: ['./favoriteslist.component.scss']
})
export class FavoritesListComponent implements OnInit {
  private data: Array<any>;
  
  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.fill();
    merge(this.favoriteService.subject).subscribe(() => this.fill());
  }
  
  fill() {
    this.data = this.favoriteService.getFavorites().sort((n1, n2) => {
      if (n1['title'] > n2['title']) {
        return 1;
      } else if (n1['title'] < n2['title']) {
        return -1;
      }
      return 0;
    });
  }

  remove(id: Number) {
    this.favoriteService.setState(id, "", false);
  }
}
