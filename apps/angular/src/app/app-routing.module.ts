import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { shouldBeAuthenticatedGuard, shouldBeNotAuthenticatedGuard } from '../core/guards/auth.guard';

import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/anime',
		pathMatch: 'full',
	},
	{
		path: 'anime',
		canActivateChild: [shouldBeAuthenticatedGuard],
		loadChildren: () => import('./features/anime/anime.module').then(module => module.AnimeModule),
	},
	{
		path: 'auth',
		canActivateChild: [shouldBeNotAuthenticatedGuard],
		loadChildren: () => import('./features/auth/auth.module').then(module => module.AuthModule),
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
