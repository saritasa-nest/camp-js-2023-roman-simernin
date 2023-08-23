import { AuthResultDto } from '../dtos/auth-result.dto';
import { AuthResult } from '../models/auth-result';

export namespace AuthResultMapper {

	/**
	 * Maps dto to model.
	 * @param dto Auth result dto.
	 */
	export function fromDto(dto: AuthResultDto): AuthResult {
		return {
			accessToken: dto.access,
			refreshToken: dto.refresh,
		};
	}
}