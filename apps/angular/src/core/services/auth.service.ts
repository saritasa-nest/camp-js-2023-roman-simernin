import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginModel } from '@js-camp/core/models/login.model';

import { Observable, map } from 'rxjs';
import { AuthResultDto } from '@js-camp/core/dtos/auth-result.dto';
import { LoginModelMapper } from '@js-camp/core/mappers/login.model.mapper';
import { AuthResultMapper } from '@js-camp/core/mappers/auth-result.mapper';
import { AuthResult } from '@js-camp/core/models/auth-result';

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
	public login(loginModel: LoginModel): Observable<AuthResult> {
		const uri = this.apiUriBuilder.buildLoginUri();

		return this.httpClient.post<AuthResultDto>(uri, LoginModelMapper.ToDto(loginModel))
			.pipe(
				map(authResultDto => AuthResultMapper.fromDto(authResultDto)),
			);
	}

}
