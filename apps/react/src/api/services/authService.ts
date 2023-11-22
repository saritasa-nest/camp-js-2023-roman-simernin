import { Login } from '@js-camp/core/models/auth/login';
import { UserAccessTokenDto } from '@js-camp/core/dtos/auth/tokens.dto';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { UserAccessTokenMapper } from '@js-camp/core/mappers/auth/tokens.mapper';
import { HttpStatusCode } from 'axios';
import { catchApiError, throwAppError } from '@js-camp/react/utils/catchApiError';
import { AppError } from '@js-camp/core/models/app-error';
import { RefreshTokensDto } from '@js-camp/core/dtos/auth/refresh-tokens.dto';

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
		try {
			const tokensDto = (await http.post<UserAccessTokenDto>(
				AppUrlsConfig.auth.login,
				LoginMapper.toDto(loginModel),
			)).data;

			authenticate(tokensDto);
		} catch (error: unknown) {
			catchApiError(error, apiError => {
				if (apiError.statusCode === HttpStatusCode.Forbidden) {
					throwAppError(apiError);
				}
			});

			throw error;
		}
	}

	/**
	 * Refresh access token.
	 */
	export async function refreshAccessToken(): Promise<void> {
		const currentTokens = UserAccessTokenStorageService.get();

		if (currentTokens === null) {
			throw new AppError(['There is no token to refresh.']);
		}

		const refreshTokensDto: RefreshTokensDto = {
			refresh: currentTokens.refreshToken,
		};

		const tokensDto = (await http.post<UserAccessTokenDto>(
			AppUrlsConfig.auth.refresh,
			refreshTokensDto,
		)).data;

		authenticate(tokensDto);
	}

	/** Logout. */
	export function logout(): void {
		UserAccessTokenStorageService.remove();
	}

	/** Provides current user is authenticated. */
	export function isAuthenticated(): boolean {
		return UserAccessTokenStorageService.get() !== null;
	}

	/**
	 * Authenticate.
	 * @param tokensDto - Tokens DTO.
	 */
	function authenticate(tokensDto: UserAccessTokenDto): void {
		const tokens = UserAccessTokenMapper.fromDto(tokensDto);
		UserAccessTokenStorageService.save(tokens);
	}
}
