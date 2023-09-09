import { NgModule } from '@angular/core';

import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';
import { AnimeRoutingModule } from './anime-routing.module';

/** Anime module. */
@NgModule({
	imports: [
		HttpClientModule,
		CommonModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatSelectModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		AnimeRoutingModule,
	],
	declarations: [AnimeDashboardComponent],
	providers: [AnimeService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class AnimeModule { }
