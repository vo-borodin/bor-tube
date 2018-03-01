import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'moviedialog',
  templateUrl: './moviedialog.component.html',
  styleUrls: ['./moviedialog.component.scss']
})
export class MoviedialogComponent {

  constructor(public dialogRef: MatDialogRef<MoviedialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Movie) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}