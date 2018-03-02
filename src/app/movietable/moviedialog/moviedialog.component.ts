import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MovieService } from '../../../services/movie.service';
import { FavoriteService } from '../../../services/favorite.service';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'moviedialog',
  templateUrl: './moviedialog.component.html',
  styleUrls: ['./moviedialog.component.scss']
})
export class MoviedialogComponent implements OnInit {
  private description: string;
  
  constructor(public dialogRef: MatDialogRef<MoviedialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Movie,
              private movieService: MovieService,
              private favoriteService: FavoriteService) { }
  
  ngOnInit() {
    this.movieService.getMovieDetails(this.data.id).subscribe((resp) => {
      this.description = resp['overview'];
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  pathToPoster300(): string {
    return MovieService.imageUrl + 'w300' + this.data.poster_path;
  }
  
  isFavorite(): boolean {
    return this.favoriteService.getState(this.data.id);
  }
  
  updateFavorite(value) {
    this.favoriteService.setState(this.data.id, this.data.title, value);
  }
}