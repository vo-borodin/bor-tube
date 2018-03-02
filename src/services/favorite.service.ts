import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

@Injectable()
export class FavoriteService {
  private static key = 'bor_tube_favorite_movies';
  private static favorites: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  load() {
    return this.fill();
  }
  
  fill(): Number[] {
    let str = this.storage.get(FavoriteService.key);
    FavoriteService.favorites = str ? JSON.parse(str) : {};
    return FavoriteService.favorites;
  }
  
  write() {
    let str = JSON.stringify(FavoriteService.favorites);
    this.storage.set(FavoriteService.key, str);
  }
  
  getFavorites(): Observable<Number[]> {
    let favoritesArray = [];
    for (let k in FavoriteService.favorites) {
      a.push({ "id": k, "title": FavoriteService.favorites[k] });
    }
    return of(favoritesArray);
  }
  
  setState(id: Number, title: string, state: boolean) {
    if (state) {
      FavoriteService.favorites[id.toString()] = title;
    } else {
      delete FavoriteService.favorites[id.toString()];
    }
    this.write();
  }
  
  getState(id: Number): boolean {
    return id.toString() in FavoriteService.favorites;
  }
}
