import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginModel } from '@js-camp/core/models/login.model';

import { Observable, map } from 'rxjs';
import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { LoginModelMapper } from '@js-camp/core/mappers/login.model.mapper';
import { TokensModelMapper } from '@js-camp/core/mappers/tokens.model.mapper';
import { TokensModel } from '@js-camp/core/models/tokens.model';

import { ApiUriBuilder } from './api-uri-builder';

/** Service for authentication. */
@Injectable()
export class AuthService {

	public constructor(
		private readonly httpClient: HttpClient,
		private readonly apiUriBuilder: ApiUriBuilder,
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
				map(authResultDto => TokensModelMapper.fromDto(authResultDto)),
			);
	}

}
