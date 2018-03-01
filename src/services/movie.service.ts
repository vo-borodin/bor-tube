import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {
  private apiKey = 'e2222de09416fb48a1e83f9cd532f0e3';
  private serviceUrl = 'https://api.themoviedb.org/3/';
  private popular = 'movie/popular';
  private search = 'search/movie';
  private config = 'configuration';
  
  private static imageUrl: string;

  constructor(private http: HttpClient) { }
  
  load() {
	const href = this.serviceUrl;
	const api_key = this.apiKey;
    const method = this.config;
    return this.http.get(`${href}${method}?api_key=${api_key}`).map(data => {
      MovieService.imageUrl = data['images'].base_url;
      return MovieService.imageUrl;
    }).toPromise();
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
	return this.http.get(url).map(data => {
      for (let res of data["results"]) {
        res.poster_path = MovieService.imageUrl + "w300" + res.poster_path;
      }
      return data;
    });
  }
}
