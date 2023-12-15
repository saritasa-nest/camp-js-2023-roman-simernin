import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { shouldBeAuthenticatedGuard } from '@js-camp/angular/core/guards/auth.guard';

import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { AnimeCreationComponent } from './anime-management/anime-creation/anime-creation.component';
import { AnimeEditingComponent } from './anime-management/anime-editing/anime-editing.component';

const routes: Routes = [
	{
		path: '',
		component: AnimeDashboardComponent,
	},
	{
		path: 'create',
		component: AnimeCreationComponent,
		canActivate: [shouldBeAuthenticatedGuard],
	},
	{
		path: ':id',
		canActivateChild: [shouldBeAuthenticatedGuard],
		children: [
			{
				path: '',
				component: AnimeDetailsComponent,
			},
			{
				path: 'edit',
				component: AnimeEditingComponent,
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

/** Anime routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
