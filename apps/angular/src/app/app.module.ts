import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { httpInterceptorProvider } from '../core/interceptors/http-interceptor-provider';
import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeModule } from './features/anime/anime.module';

/** App module. */
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		AnimeModule,
	],
	providers: [httpInterceptorProvider],
	bootstrap: [AppComponent],
})
export class AppModule { }
