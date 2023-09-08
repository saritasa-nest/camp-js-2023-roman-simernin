import { UserAccessTokenDto } from '../../dtos/auth/tokens.dto';
import { UserAccessToken } from '../../models/auth/user-access-token';

export namespace UserAccessTokenMapper {

	/**
	 * Maps dto to model.
	 * @param dto User token access dto.
	 */
	export function fromDto(dto: UserAccessTokenDto): UserAccessToken {
		return {
			accessToken: dto.access,
			refreshToken: dto.refresh,
		};
	}
}
