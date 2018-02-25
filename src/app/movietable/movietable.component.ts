import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'movietable',
  templateUrl: './movietable.component.html',
  styleUrls: ['./movietable.component.scss']
})
export class MovietableComponent implements OnInit {

  dataSource = new MovieDataSource(this.movieService);
  displayedColumns = ['title'];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

}

export class MovieDataSource extends DataSource<any> {
	constructor(private movieService: MovieService) {
		super();
	}
	
	connect(): Observable<Movie[]> {
		return this.movieService.getMovies();
	}
	
	disconnect() {
		
	}
}
