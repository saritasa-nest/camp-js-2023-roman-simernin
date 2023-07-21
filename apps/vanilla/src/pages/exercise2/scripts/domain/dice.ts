/** Provides dice interface. */
export interface IDice {

	/** Dice current side. */
	readonly currentSide: number;

	/** Randomize new dice side and set it to current side. */
	readonly roll: () => void;
}

/** Domain model for dice. */
export class Dice implements IDice {

	private readonly _sidesCount: number;

	private _currentSide?: number;

	public constructor(sideCount: number) {
		if (sideCount <= 0) {
			throw new Error('Side count can not be equal or less then zero');
		}

		this._sidesCount = sideCount;
	}

	/** @inheritdoc */
	public get currentSide(): number {
		if (this._currentSide === undefined) {
			throw new Error('Current is not defined, need to roll before');
		}

		return this._currentSide;
	}

	/** @inheritdoc */
	public roll(): void {
		this._currentSide = this.getRandomNumber(this._sidesCount);
	}

	private getRandomNumber(maxValue: number): number {
		// Generate random number from [0, maxValue - 1].
		let randomNumber = Math.floor(Math.random() * maxValue);

		// Make random number contains in diaposon [1, maxValue].
		randomNumber += 1;

		return randomNumber;
	}
}
