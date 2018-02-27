import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operators/switchMap';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'movietable',
  templateUrl: './movietable.component.html',
  styleUrls: ['./movietable.component.scss']
})
export class MovietableComponent implements OnInit {

  displayedColumns = ['title'];
  itemsCount$ = 0
  itemsPerPage$ = 10
  movies = []Movie
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieService: MovieService) { }
  
  ngOnInit() {
    merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
          return this.movieService.getMovies(this.paginator.pageIndex + 1);
      }),
      map(data => {
          this.itemsPerPage$ = data.results.length;
          this.itemsCount$ = data.total_results;
          return data.results;
      })).subscribe(movies => this.movies = movies);
  }
}
