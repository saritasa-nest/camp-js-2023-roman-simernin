import { LoginDto } from '../dtos/login.dto';
import { LoginModel } from '../models/login.model';

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