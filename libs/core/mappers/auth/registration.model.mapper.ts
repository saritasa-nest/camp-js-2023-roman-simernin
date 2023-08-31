import { RegistrationDto } from '../../dtos/auth/registration.dto';
import { RegistrationModel } from '../../models/auth/registration.model';

export namespace RegistrationModelMapper {

	/**
	 * Maps dto to model.
	 * @param model Registration model.
	 */
	export function ToDto(model: RegistrationModel): RegistrationDto {
		return {
			first_name: model.firstName,
			last_name: model.lastName,
			email: model.email,
			password: model.password,
		};
	}
}
