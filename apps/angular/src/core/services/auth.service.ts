import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { LoginModel } from '@js-camp/core/models/login.model';
import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { LoginModelMapper } from '@js-camp/core/mappers/login.model.mapper';
import { TokensModelMapper } from '@js-camp/core/mappers/tokens.model.mapper';

import { RefreshTokensDto } from '@js-camp/core/dtos/refresh-tokens.dto';

import { TokensStorageService } from './tokens-storage.service';
import { ApiUriBuilder } from './api-uri-builder';

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

	public constructor() {
		this.isAuthenticatedSubject$ = new BehaviorSubject(this.isAuthenticated());
	}

	/**
	 * Login.
	 * @param loginModel - Login model.
		**/
	public login(loginModel: LoginModel): Observable<void> {
		const uri = this.apiUriBuilder.buildLoginUri();

		return this.httpClient.post<TokensDto>(uri, LoginModelMapper.ToDto(loginModel)).pipe(
			map(tokensDto => this.authenticate(tokensDto)),
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

		this.router.navigate(['login']);
	}

	/** Provides current user is authenticated. */
	public isAuthenticated(): boolean {
		return this.tokenStorageService.get() !== null;
	}

	/** * Stream for authentication flag. */
	public get isAuthenticated$(): Observable<boolean> {
		return this.isAuthenticatedSubject$.asObservable();
	}

	private authenticate(tokensDto: TokensDto): void {
		const tokens = TokensModelMapper.fromDto(tokensDto);

		this.tokenStorageService.save(tokens);

		this.isAuthenticatedSubject$.next(this.isAuthenticated());
	}
}
