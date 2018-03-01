import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {
  private apiKey = 'e2222de09416fb48a1e83f9cd532f0e3';
  private serviceUrl = 'https://api.themoviedb.org/3/';
  private popular = 'movie/popular';
  private search = 'search/movie';
  private config = 'configuration';
  private genre = 'genre/movie/list';
  
  private static genres: any;
  private static imageUrl: string;

  constructor(private http: HttpClient) { }
  
  load() {
    const href = this.serviceUrl;
    const api_key = this.apiKey;
    let method = this.config;
    return this.http.get(`${href}${method}?api_key=${api_key}`).map((data: Response) => {
      MovieService.imageUrl = data['images'].base_url;
      method = this.genre;
      return this.http.get(`${href}${method}?api_key=${api_key}`).map((data: Response) => {
        MovieService.genres = {};
        for (let genre:any of data['genres']) {
          MovieService.genres[genre['id']] = genre['name'];
        }
        return MovieService.genres;
      }).toPromise();
    }).toPromise();
  }
  
  getGenresString(ids: Number[]): string {
    let genres = [];
    for (let id: Number of ids) {
      genres.push(MovieService.genres[id]);
    }
    return genres.join(', ');
  }
  
  getMovies(pageIndex: Number, searchStr: string): Observable<any> {
    const page = pageIndex.toString();
    const href = this.serviceUrl;
    const api_key = this.apiKey;
    let method: string, params = `api_key=${api_key}&page=${page}`;
    if (searchStr) {
      method = this.search;
      params += `&query=${searchStr}`;
    } else {
      method = this.popular;
    }
    const url = `${href}${method}?${params}`;
    return this.http.get(url).map((data: Response) => {
      for (let res of data['results']) {
        res.poster_path = MovieService.imageUrl + 'w300' + res.poster_path;
      }
      return data;
    });
  }
}
