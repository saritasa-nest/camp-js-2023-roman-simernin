/** Provides player interface. */
export interface IPlayer {

	/** Player name. */
	readonly name: string;

	/** Last points for current player. */
	readonly lastPoints: number;

	/** Sum of all points for current player. */
	readonly totalPoints: number;

	/** Status provides user won or not.. */
	readonly winStatus: boolean | undefined;

	/** Status provides user passed or not.. */
	readonly passStatus: boolean;

	/**
	 * Add points.
	 * @param points - Points.
	 */
	readonly addPoints: (points: number) => void;

	/**
	 * Set winning status.
	 * @param winStatus - Provides player win or not.
	 */
	readonly setWinStatus: (winStatus: boolean) => void;

	/** Make player be passed. After pass player can not add points. */
	readonly pass: () => void;
}

/** Domain model for player. */
export class Player implements IPlayer {

	private _lastPoints = 0;

	private _totalPoints = 0;

	private _winStatus: boolean | undefined;

	private _passStatus = false;

	constructor(readonly name: string) {
	}

	/** @inheritdoc */
	public get lastPoints(): number {
		return this._lastPoints;
	}

	/** @inheritdoc */
	public get totalPoints(): number {
		return this._totalPoints;
	}

	/** @inheritdoc */
	public get winStatus(): boolean | undefined {
		return this._winStatus;
	}

	/** @inheritdoc */
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

	/** @inheritdoc */
	public setWinStatus(winStatus: boolean) {
		if (this._winStatus !== undefined) {
			throw new Error('Win status has already defined.');
		}

		this._winStatus = winStatus;
	}

	/** @inheritdoc */
	public pass(): void {
		this._passStatus = true;
	}
}
