import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
  itemsCount$ = 0;
  itemsPerPage$ = 10;
  movies: Movie[];
  searchStr = "";
  const subject = new Subject();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieService: MovieService) { }
  
  onModelChange(value) {
    this.searchStr = value;
    this.subject.next(value);
  }
  
  ngOnInit() {
    merge(this.paginator.page, this.subject).pipe(
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
