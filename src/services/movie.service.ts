import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../models/movie.model';

@Injectable()
export class MovieService {

  private serviceUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=e2222de09416fb48a1e83f9cd532f0e3';

  constructor(private http: HttpClient) { }
  
  getMovies(): Observable<Movie[]> {
	  return this.http.get(this.serviceUrl).map(
	      (data: any) => data.results
	  );
  }
}
