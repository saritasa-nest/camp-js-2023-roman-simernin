import { Login } from '@js-camp/core/models/auth/login';
import { UserAccessTokenDto } from '@js-camp/core/dtos/auth/tokens.dto';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { UserAccessTokenMapper } from '@js-camp/core/mappers/auth/tokens.mapper';

import { http } from '..';

import { AppUrlsConfig } from './apiUrlsConfig';
import { UserAccessTokenStorageService } from './userAccessTokenStorageService';

/** Auth service. */
export namespace AuthService {

	/**
		* Login.
		* @param loginModel - Login model.
		**/
	export async function login(loginModel: Login): Promise<void> {
		const { data: tokensDto } = await http.post<UserAccessTokenDto>(
			AppUrlsConfig.auth.login,
			LoginMapper.toDto(loginModel),
		);

		const tokens = UserAccessTokenMapper.fromDto(tokensDto);
		return UserAccessTokenStorageService.save(tokens);
	}
}
