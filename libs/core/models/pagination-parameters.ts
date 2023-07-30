/** Pagination parameters. */
export class PaginationParameters {

	/** Count of elements in paginated data set. */
	public readonly pageSize: number;

	/** Number of page. */
	public readonly pageNumber: number;

	/** Count of elements between first and current page. */
	public get offset(): number {
		return this.pageSize * (this.pageNumber - 1);
	}

	public constructor(pageSize: number, pageNumber: number) {
		if (pageSize <= 0) {
			throw new Error('Page size can not be equal or less than zero.');
		}

		if (pageNumber < 0) {
			throw new Error('Page number can not be less than zero.');
		}

		this.pageSize = pageSize;
		this.pageNumber = pageNumber;
	}
}
