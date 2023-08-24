import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginModel } from '@js-camp/core/models/login.model';

import { Observable, map, tap } from 'rxjs';
import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { LoginModelMapper } from '@js-camp/core/mappers/login.model.mapper';
import { TokensModelMapper } from '@js-camp/core/mappers/tokens.model.mapper';
import { TokensModel } from '@js-camp/core/models/tokens.model';

import { ApiUriBuilder } from './api-uri-builder';
import { TokensStorageService } from './tokens-storage.service';

/** Service for authentication. */
@Injectable()
export class AuthService {

	public constructor(
		private readonly httpClient: HttpClient,
		private readonly apiUriBuilder: ApiUriBuilder,
		private readonly tokenStorageService: TokensStorageService,
	) {

	}

	/**
	 * Login.
	 * @param loginModel - Login model.
		**/
	public login(loginModel: LoginModel): Observable<TokensModel> {
		const uri = this.apiUriBuilder.buildLoginUri();

		return this.httpClient.post<TokensDto>(uri, LoginModelMapper.ToDto(loginModel))
			.pipe(
				map(tokensDto => TokensModelMapper.fromDto(tokensDto)),
				tap(tokens => this.tokenStorageService.save(tokens)),
			);
	}

}
