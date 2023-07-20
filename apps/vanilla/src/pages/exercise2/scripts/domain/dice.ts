
/** Domain model for dice. */
export class Dice {

	private _sidesCount = 6;

	private _currentSide: number | undefined;

	/**
	 * Set dice side count value.
	 * @param sideCount - Provide side count for dice.
	 */
	public set sideCount(sideCount: number) {
		if (sideCount <= 0) {
			throw new Error('Side count can not be equal or less then zero');
		}

		this._sidesCount = sideCount;
	}

	/** Get dice current side. */
	public get currentSide(): number {
		if (this._currentSide === undefined) {
			throw new Error('Current is not defined, need to roll before');
		}

		return this._currentSide;
	}

	/** Randomize new dice side. */
	public roll(): void {
		this._currentSide = this.getRandomNumber(this._sidesCount);
	}

	private getRandomNumber(maxValue: number): number {
		return Math.floor(Math.random() * maxValue) + 1;
	}
}
