import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { shouldBeNotAuthenticatedGuard } from '../core/guards/auth.guard';

import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'anime',
		pathMatch: 'full',
	},
	{
		path: 'anime',
		loadChildren: () => import('./features/anime/anime.module').then(module => module.AnimeModule),
	},
	{
		path: 'auth',
		canActivateChild: [shouldBeNotAuthenticatedGuard],
		loadChildren: () => import('./features/auth/auth.module').then(module => module.AuthModule),
	},
	{
		path: 'not-found',
		component: PageNotFoundComponent,
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
