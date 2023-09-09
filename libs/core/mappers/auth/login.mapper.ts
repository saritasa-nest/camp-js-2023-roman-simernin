import { LoginDto } from '../../dtos/auth/login.dto';
import { Login } from '../../models/auth/login';

export namespace LoginMapper {

	/**
	 * Maps dto to model.
	 * @param model Login model.
	 */
	export function toDto(model: Login): LoginDto {
		return {
			email: model.email,
			password: model.password,
		};
	}
}
