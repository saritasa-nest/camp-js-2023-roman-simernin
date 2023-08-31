import { LoginDto } from '../../dtos/auth/login.dto';
import { LoginModel } from '../../models/auth/login.model';

export namespace LoginModelMapper {

	/**
	 * Maps dto to model.
	 * @param model Login model.
	 */
	export function ToDto(model: LoginModel): LoginDto {
		return {
			email: model.email,
			password: model.password,
		};
	}
}
