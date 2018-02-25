import { Component, ViewChild, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
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

  dataSource: MovieDataSource;
  displayedColumns = ['title'];
  
  moviesCount = 0;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
	this.dataSource = new MovieDataSource(this.movieService);
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
