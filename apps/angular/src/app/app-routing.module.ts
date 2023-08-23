import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeDashboardComponent } from './features/anime/anime-dashboard/anime-dashboard.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';

const routes: Routes = [
	{
		path: '', 
		redirectTo: '/anime', 
		pathMatch: 'full',
	},
	{
		path: 'anime',
		component: AnimeDashboardComponent,
	},
	{
		path: '**',
		component: PageNotFoundComponent,
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
