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
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { AnimeCoverModalComponent } from './anime-details/anime-cover-modal/anime-cover-modal.component';
import { AnimeInfoItemComponent } from './anime-details/anime-info-item/anime-info-item.component';
import { AnimeFormComponent } from './anime-management/anime-form/anime-form.component';
import { AnimeCreationComponent } from './anime-management/anime-creation/anime-creation.component';
import { AnimeEditingComponent } from './anime-management/anime-editing/anime-editing.component';

/** Anime module. */
@NgModule({
	imports: [
		HttpClientModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatSelectModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		SharedModule,
		MatDialogModule,
		MatIconModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		CommonModule,
		RouterModule,
		AnimeRoutingModule,
	],
	declarations: [
		AnimeDashboardComponent,
		AnimeDetailsComponent,
		AnimeCoverModalComponent,
		AnimeInfoItemComponent,
		AnimeFormComponent,
		AnimeCreationComponent,
		AnimeEditingComponent,
	],
	providers: [AnimeService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class AnimeModule {}
