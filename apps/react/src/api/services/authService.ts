import { Login } from '@js-camp/core/models/auth/login';
import { UserAccessTokenDto } from '@js-camp/core/dtos/auth/tokens.dto';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { UserAccessTokenMapper } from '@js-camp/core/mappers/auth/tokens.mapper';
import { HttpStatusCode } from 'axios';
import { catchApiError, throwAppError } from '@js-camp/react/utils/catchApiError';

import { http } from '..';

import { AppUrlsConfig } from './apiUrlsConfig';
import { UserAccessTokenStorageService } from './userAccessTokenStorageService';

/** Auth service. */
export namespace AuthService {

	/**
	 * Login.
	 * @param loginModel - Login model.
	 */
	export async function login(loginModel: Login): Promise<void> {
		let tokensDto: UserAccessTokenDto;

		try {
			tokensDto = (await http.post<UserAccessTokenDto>(
				AppUrlsConfig.auth.login,
				LoginMapper.toDto(loginModel),
			)).data;
		} catch (error: unknown) {
			catchApiError(error, apiError => {
				if (apiError.statusCode === HttpStatusCode.Forbidden) {
					throwAppError(apiError);
				}
			});

			throw error;
		}

		const tokens = UserAccessTokenMapper.fromDto(tokensDto);
		return UserAccessTokenStorageService.save(tokens);
	}

	/** Logout. */
	export function logout(): void {
		UserAccessTokenStorageService.remove();
	}

	/** Provides current user is authenticated. */
	export function isAuthenticated(): boolean {
		return UserAccessTokenStorageService.get() !== null;
	}
}
