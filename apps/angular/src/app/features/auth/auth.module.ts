import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';

/** Authentication module. */
@NgModule({
	imports: [
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		CommonModule,
		RouterModule,
		AuthRoutingModule,
	],
	declarations: [LoginComponent, RegistrationComponent],
})
export class AuthModule {}
