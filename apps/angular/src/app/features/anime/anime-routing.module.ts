import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: AnimeDashboardComponent,
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
