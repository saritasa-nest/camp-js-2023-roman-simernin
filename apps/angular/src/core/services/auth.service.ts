import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { Login } from '@js-camp/core/models/auth/login';
import { TokensDto } from '@js-camp/core/dtos/auth/tokens.dto';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { TokensMapper } from '@js-camp/core/mappers/auth/tokens.mapper';
import { Registration } from '@js-camp/core/models/auth/registration';
import { RegistrationMapper } from '@js-camp/core/mappers/auth/registration.mapper';
import { RefreshTokensDto } from '@js-camp/core/dtos/auth/refresh-tokens.dto';

import { applicationApiErrorHandler, catchApiError } from '../utils/rxjs/catch-api-error';

import { ApiUriBuilder } from './api-uri-builder';
import { TokensStorageService } from './tokens-storage.service';

/** Service for authentication. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {

	private readonly httpClient = inject(HttpClient);

	private readonly apiUriBuilder = inject(ApiUriBuilder);

	private readonly tokenStorageService = inject(TokensStorageService);

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
		const uri = this.apiUriBuilder.buildLoginUri();

		return this.httpClient.post<TokensDto>(uri, LoginMapper.toDto(loginModel)).pipe(
			map(tokensDto => this.authenticate(tokensDto)),
			catchApiError(apiError => applicationApiErrorHandler(apiError)),
		);
	}

	/**
	 * Register new user.
	 * @param registrationModel - Registration model.
	 **/
	public register(registrationModel: Registration): Observable<void> {
		const uri = this.apiUriBuilder.buildRegistrationUri();

		return this.httpClient.post<TokensDto>(uri, RegistrationMapper.toDto(registrationModel)).pipe(
			map(tokensDto => this.authenticate(tokensDto)),
			catchApiError(apiError => applicationApiErrorHandler(apiError)),
		);
	}

	/**
	 * Refresh access token.
	 * @param secret Secret data.
	 */
	public refreshAccessToken(): Observable<void> {
		const uri = this.apiUriBuilder.buildRefreshUri();

		const currentTokens = this.tokenStorageService.get();

		const refreshTokensDto: RefreshTokensDto = {
			refresh: currentTokens?.refreshToken ?? '',
		};

		return this.httpClient.post<TokensDto>(uri, refreshTokensDto).pipe(
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

	private authenticate(tokensDto: TokensDto): void {
		const tokens = TokensMapper.fromDto(tokensDto);

		this.tokenStorageService.save(tokens);

		this.isAuthenticatedSubject$.next(this.isAuthenticated());
	}
}
