import { TokensDto } from '../dtos/tokens.dto';
import { TokensModel } from '../models/tokens.model';

export namespace TokensModelMapper {

	/**
	 * Maps dto to model.
	 * @param dto Auth result dto.
	 */
	export function fromDto(dto: TokensDto): TokensModel {
		return {
			accessToken: dto.access,
			refreshToken: dto.refresh,
		};
	}
}
