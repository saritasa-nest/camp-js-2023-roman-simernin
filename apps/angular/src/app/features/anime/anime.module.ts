import { NgModule } from '@angular/core';

import { AnimeService } from '@js-camp/angular/core/services/animeService';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';

/** Anime table module. */
@NgModule({
	imports: [HttpClientModule, CommonModule, MatTableModule],
	declarations: [AnimeDashboardComponent],
	exports: [AnimeDashboardComponent],
	providers: [AnimeService],
})
export class AnimeModule { }
