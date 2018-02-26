import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie.model';

@Injectable()
export class MovieService {
  private apiKey = 'e2222de09416fb48a1e83f9cd532f0e3';
  private serviceUrl = 'https://api.themoviedb.org/3/movie/popular?api_key={{$apiKey}}&page={{$page}}';

  constructor(private http: HttpClient) { }
  
  getMovies(page: Number): Observable<any> {
	  let url = this.serviceUrl.replace('{{$apiKey}}', this.apiKey);
	  url = url.replace('{{$page}}', page.toString());
	  return this.http.get(url);
  }
}
