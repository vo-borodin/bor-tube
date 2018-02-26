import { Component, OnInit } from '@angular/core';
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

  constructor(private movieService: MovieService) { }
  
  ngOnInit() {
	this.dataSource = new MovieDataSource(this.movieService);
  }

  public changePage(event?:PageEvent) {
	this.dataSource.pageIndex$ = event.pageIndex;
  }
}

export class MovieDataSource extends DataSource<any> {
	itemsPerPage$ = 10
	pageIndex$ = 1
	itemsCount$ = 0
	constructor(private movieService: MovieService) {
		super();
	}
	
	connect(): Observable<Movie[]> {
		let moviesRaw = this.movieService.getMovies(this.pageIndex$);
		let moviesObservable = moviesRaw.map(
	        (data: any) => {
				this.itemsPerPage$ = data.results.length;
				this.itemsCount$ = data.total_results;
				return data.results;
			}
	    );
		return moviesObservable;
	}
	
	disconnect() {
		
	}
}



// WEBPACK FOOTER //
// D:/bor-tube/src/app/movietable/movietable.component.ts


// WEBPACK FOOTER //
// D:/bor-tube/src/app/movietable/movietable.component.ts


// WEBPACK FOOTER //
// D:/bor-tube/src/app/movietable/movietable.component.ts