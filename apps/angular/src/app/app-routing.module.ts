import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth.guard';

import { AnimeDashboardComponent } from './features/anime/anime-dashboard/anime-dashboard.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
	{
		path: 'anime',
		component: AnimeDashboardComponent,
		canActivate: [authGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
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
