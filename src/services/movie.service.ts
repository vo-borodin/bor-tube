import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie.model';

@Injectable()
export class MovieService {
  private apiKey = 'e2222de09416fb48a1e83f9cd532f0e3';
  private serviceUrl = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) { }
  
  getMovies(pageIndex: Number): Observable<any> {
	  const page = pageIndex.toString();
	  const href = this.serviceUrl;
	  const api_key = this.apiKey;
	  const url = `${href}movie/popular?api_key=${api_key}&page=${page}`;
	  return this.http.get(url);
  }
}
