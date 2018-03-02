import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'angular-webstorage-service';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';

import { routedComponents, AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { MatInputModule, MatProgressSpinnerModule, MatPaginatorModule,
         MatSortModule, MatTableModule } from "@angular/material";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MovietableComponent } from './movietable/movietable.component';
import { MoviedialogComponent } from './movietable/moviedialog/moviedialog.component';
import { FavoritesListComponent } from './favoriteslist/favoriteslist.component';

import { APP_INITIALIZER } from '@angular/core';

import { MovieService } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

export function init_app(movieService: MovieService,
                         favoriteService: FavoriteService) {
  return () => movieService.load().then(() => favoriteService.load())
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    MovietableComponent,
    MoviedialogComponent,
    FavoritesListComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    SharedModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
	MatGridListModule,
    MatListModule,
    MatDividerModule,
    HttpClientModule,
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title,
    MovieService,
    FavoriteService,
    {
      'provide': APP_INITIALIZER,
      'useFactory': init_app,
      'deps': [MovieService, FavoriteService],
      'multi': true
    },
  ], // additional providers needed for this module
  entryComponents: [
    MoviedialogComponent,
    FavoritesListComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
