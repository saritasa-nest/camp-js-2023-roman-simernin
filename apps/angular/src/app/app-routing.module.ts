import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeDashboardComponent } from './features/anime/anime-dashboard/anime-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: AnimeDashboardComponent
	}
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
