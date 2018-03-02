import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

@Injectable()
export class FavoriteService {
  private static key = 'bor_tube_favorite_movies';
  private static favorites: any;
  private static separator = ','; 

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  load() {
    return this.fill();
  }
  
  fill(): Number[] {
    let str = this.storage.get(FavoriteService.key);
    let a = str ? str.split(FavoriteService.separator) : [];
    FavoriteService.favorites = {};
    for (let i of a) {
      FavoriteService.favorites[i.toString()] = true;
    }
    return FavoriteService.favorites;
  }
  
  write() {
    let ids = Object.keys(FavoriteService.favorites);
    let str = ids.join(FavoriteService.separator);
    this.storage.set(FavoriteService.key, str);
  }
  
  getFavorites(): Observable<Number[]> {
    return of(this.fill());
  }
  
  setState(id: Number, state: boolean) {
    if (state) {
      FavoriteService.favorites[id.toString()] = true;
    } else {
      delete FavoriteService.favorites[id.toString()];
    }
    this.write();
  }
  
  getState(id: Number): boolean {
    return id.toString() in FavoriteService.favorites;
  }
}
