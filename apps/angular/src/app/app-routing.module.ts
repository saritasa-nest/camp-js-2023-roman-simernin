import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuardFactory } from '../core/guards/auth.guard';

import { AnimeDashboardComponent } from './features/anime/anime-dashboard/anime-dashboard.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { LoginComponent } from './features/auth/login/login.component';

const shouldBeAuthenticatedGuard = authGuardFactory(true);
const shouldBeNotAuthenticatedGuard = authGuardFactory(false);

const routes: Routes = [
	{
		path: '',
		redirectTo: '/anime',
		pathMatch: 'full',
	},
	{
		path: 'anime',
		component: AnimeDashboardComponent,
		canActivate: [shouldBeAuthenticatedGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [shouldBeNotAuthenticatedGuard],
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
