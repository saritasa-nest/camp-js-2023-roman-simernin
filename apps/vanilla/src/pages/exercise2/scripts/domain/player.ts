/** Domain model for player. */
export class Player {

	private _name = 'no name';

	private _lastPoints = 0;

	private _totalPoints = 0;

	private _winStatus: boolean | undefined;

	private _passStatus = false;

	/**
	 * Set player name.
	 * @param name - Player name.
	 */
	public set name(name: string) {
		this._name = name;
	}

	/** Get player name. */
	public get name(): string {
		return this._name;
	}

	/** Get last points for current player. */
	public get lastPoints(): number {
		return this._lastPoints;
	}

	/** Get sum of all points for current player. */
	public get totalPoints(): number {
		return this._totalPoints;
	}

	/**
	 * Set winning status.
	 * @param winStatus - Provides player win or not.
	 */
	public set winStatus(winStatus: boolean) {
		this._winStatus = winStatus;
	}

	/** Get winning status. */
	public get winStatus(): boolean | undefined {
		return this._winStatus;
	}

	/** Get status that provides user passed or not. */
	public get passStatus(): boolean {
		return this._passStatus;
	}

	/**
	 * Add points.
	 * @param points - Points.
	 */
	public addPoints(points: number): void {
		if (this._passStatus) {
			throw new Error('Can not add points when player make a pass');
		}

		if (points <= 0) {
			throw new Error('Can not add zero or less points');
		}

		this._lastPoints = points;
		this._totalPoints += points;
	}

	/** Make player be passed. After pass player can not add points. */
	public pass(): void {
		this._passStatus = true;
	}
}
