import { NgModule } from '@angular/core';

import { AuthService } from '@js-camp/angular/core/services/auth.service';

import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

/** Anime table module. */
@NgModule({
	imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
		CommonModule,
	],
	declarations: [LoginComponent],
	exports: [LoginComponent],
	providers: [AuthService],
})
export class AuthModule { }