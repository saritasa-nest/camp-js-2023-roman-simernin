import { NgModule } from '@angular/core';

import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';

import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';

/** Anime table module. */
@NgModule({
	imports: [
		HttpClientModule,
		CommonModule,
		MatTableModule,
		MatPaginatorModule,
		BrowserAnimationsModule,
		MatSortModule,
	],
	declarations: [AnimeDashboardComponent],
	exports: [AnimeDashboardComponent],
	providers: [AnimeService],
})
export class AnimeModule { }
