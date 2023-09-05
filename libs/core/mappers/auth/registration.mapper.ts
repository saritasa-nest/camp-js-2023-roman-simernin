import { RegistrationDto } from '../../dtos/auth/registration.dto';
import { Registration } from '../../models/auth/registration';

export namespace RegistrationMapper {

	/**
	 * Maps dto to model.
	 * @param model Registration model.
	 */
	export function toDto(model: Registration): RegistrationDto {
		return {
			first_name: model.firstName,
			last_name: model.lastName,
			email: model.email,
			password: model.password,
		};
	}
}
