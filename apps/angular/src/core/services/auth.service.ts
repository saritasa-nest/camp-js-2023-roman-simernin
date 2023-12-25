import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { Login } from '@js-camp/core/models/auth/login';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { Registration } from '@js-camp/core/models/auth/registration';
import { RegistrationMapper } from '@js-camp/core/mappers/auth/registration.mapper';
import { RefreshTokensDto } from '@js-camp/core/dtos/auth/refresh-tokens.dto';

import { UserAccessTokenDto } from '@js-camp/core/dtos/auth/tokens.dto';

import { UserAccessTokenMapper } from '@js-camp/core/mappers/auth/tokens.mapper';

import { applicationApiErrorHandler, catchApiError } from '../utils/rxjs/catch-api-error';

import { ApiUrlBuilder } from './api-url-builder';
import { UserAccessTokenStorageService } from './user-access-token-storage.service';

/** Service for authentication. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {

	private readonly httpClient = inject(HttpClient);

	private readonly apiUrlBuilder = inject(ApiUrlBuilder);

	private readonly tokenStorageService = inject(UserAccessTokenStorageService);

	private readonly router = inject(Router);

	private readonly isAuthenticatedSubject$: BehaviorSubject<boolean>;

	/** Stream for authentication flag. */
	public readonly isAuthenticated$: Observable<boolean>;

	public constructor() {
		this.isAuthenticatedSubject$ = new BehaviorSubject(this.isAuthenticated());
		this.isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
	}

	/**
	 * Login.
	 * @param loginModel - Login model.
	 **/
	public login(loginModel: Login): Observable<void> {
		const url = this.apiUrlBuilder.buildLoginUrl();

		return this.httpClient.post<UserAccessTokenDto>(url, LoginMapper.toDto(loginModel)).pipe(
			map(tokensDto => this.authenticate(tokensDto)),
			catchApiError(apiError => applicationApiErrorHandler(apiError)),
		);
	}

	/**
	 * Register new user.
	 * @param registrationModel - Registration model.
	 **/
	public register(registrationModel: Registration): Observable<void> {
		const url = this.apiUrlBuilder.buildRegistrationUrl();

		return this.httpClient.post<UserAccessTokenDto>(url, RegistrationMapper.toDto(registrationModel)).pipe(
			map(tokensDto => this.authenticate(tokensDto)),
			catchApiError(apiError => applicationApiErrorHandler(apiError)),
		);
	}

	/**
	 * Refresh access token.
	 * @param secret Secret data.
	 */
	public refreshAccessToken(): Observable<void> {
		const url = this.apiUrlBuilder.buildRefreshUrl();

		const currentTokens = this.tokenStorageService.get();

		const refreshTokensDto: RefreshTokensDto = {
			refresh: currentTokens?.refreshToken ?? '',
		};

		return this.httpClient.post<UserAccessTokenDto>(url, refreshTokensDto).pipe(
			map(tokensDto => this.authenticate(tokensDto)),
		);
	}

	/** Logout. */
	public logout(): void {
		this.tokenStorageService.delete();

		this.isAuthenticatedSubject$.next(this.isAuthenticated());

		this.router.navigate(['auth']);
	}

	/** Provides current user is authenticated. */
	public isAuthenticated(): boolean {
		return this.tokenStorageService.get() !== null;
	}

	private authenticate(tokensDto: UserAccessTokenDto): void {
		const tokens = UserAccessTokenMapper.fromDto(tokensDto);

		this.tokenStorageService.save(tokens);

		this.isAuthenticatedSubject$.next(this.isAuthenticated());
	}
}
