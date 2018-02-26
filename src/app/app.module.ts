import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MovietableComponent } from './movietable/movietable.component';

import { MovieService } from '../services/movie.service'

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    MovietableComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
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
	HttpClientModule,
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title,
	MovieService
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
