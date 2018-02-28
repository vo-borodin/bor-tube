import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie.model';

@Injectable()
export class MovieService {
  private apiKey = 'e2222de09416fb48a1e83f9cd532f0e3';
  private serviceUrl = 'https://api.themoviedb.org/3/';
  private popular = 'movie/popular';
  private search = 'search/movie';

  constructor(private http: HttpClient) { }
  
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
	return this.http.get(url);
  }
}
