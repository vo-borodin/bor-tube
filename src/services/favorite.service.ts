import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FavoriteService {
  private static key = 'bor_tube_favorite_movies';
  private static favorites: any;
  public subject = new Subject();

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
    this.subject.next(FavoriteService.favorites);
  }
  
  getFavorites(): Array<any> {
    let favoritesArray = [];
    for (let k in FavoriteService.favorites) {
      favoritesArray.push({
        "id": k,
        "title": FavoriteService.favorites[k]
      });
    }
    return favoritesArray;
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
