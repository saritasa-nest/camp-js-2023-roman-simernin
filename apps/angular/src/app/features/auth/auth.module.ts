import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

/** Anime table module. */
@NgModule({
	imports: [
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		CommonModule,
		RouterModule,
	],
	declarations: [LoginComponent, RegistrationComponent],
	exports: [LoginComponent, RegistrationComponent],
})
export class AuthModule {}
