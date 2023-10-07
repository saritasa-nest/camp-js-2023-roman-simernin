import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { shouldBeAuthenticatedGuard } from '@js-camp/angular/core/guards/auth.guard';

import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';

const routes: Routes = [
	{
		path: '',
		component: AnimeDashboardComponent,
	},
	{
		path: ':id',
		component: AnimeDetailsComponent,
		canActivateChild: [shouldBeAuthenticatedGuard],
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
export class AnimeRoutingModule { }
