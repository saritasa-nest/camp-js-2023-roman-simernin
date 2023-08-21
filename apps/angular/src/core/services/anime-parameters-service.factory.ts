import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AnimeParametersService } from './anime-parameters.service';

/** Service for creation AnimeParametersService. */
@Injectable()
export class AnimeParametersServiceFactory {

	public constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
	}

	/** Create AnimeParametersService.
		* @param defaultPageSize - Default page size.
		* @param availablePageSizes - Available page sizes.
  */
	public create(defaultPageSize: number, availablePageSizes: readonly number[]): AnimeParametersService {
		return new AnimeParametersService(defaultPageSize, availablePageSizes, this.router, this.activatedRoute);
	}
}
