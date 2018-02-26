import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operators/switchMap';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
//import { DataSource } from '@angular/cdk/collections';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'movietable',
  templateUrl: './movietable.component.html',
  styleUrls: ['./movietable.component.scss']
})
export class MovietableComponent implements OnInit {

  displayedColumns = ['title'];
  itemsCount$ = 0
  itemsPerPage$ = 10
  dataSource = new MatTableDataSource();
  
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
      })).subscribe(movies => this.dataSource.data = movies);
    )
  }

  public changePage(event?:PageEvent) {
    this.pageIndex = event.pageIndex;
  }
}
