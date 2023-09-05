import { TokensDto } from '../../dtos/auth/tokens.dto';
import { Tokens } from '../../models/auth/tokens';

export namespace TokensMapper {

	/**
	 * Maps dto to model.
	 * @param dto Auth result dto.
	 */
	export function fromDto(dto: TokensDto): Tokens {
		return {
			accessToken: dto.access,
			refreshToken: dto.refresh,
		};
	}
}
