import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { httpInterceptorProvider } from '../core/interceptors/http-interceptor-provider';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './../shared/shared.module';

import { AppComponent } from './app.component';

/** App module. */
@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		SharedModule,
		AppRoutingModule,
		MatButtonModule,
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
	],
	providers: [httpInterceptorProvider],
	bootstrap: [AppComponent],
})
export class AppModule { }
