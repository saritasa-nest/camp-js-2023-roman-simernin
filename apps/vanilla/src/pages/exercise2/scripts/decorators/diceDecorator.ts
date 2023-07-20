import { IDice } from '../domain/dice';

/** Wrap Dice for adding new functionality. */
export abstract class DiceDecorator implements IDice {

	public constructor(private readonly dice: IDice) {
	}

	/** @inheritdoc */
	public get currentSide(): number {
		return this.dice.currentSide;
	}

	/** @inheritdoc */
	public roll(): void {
		this.dice.roll();
	}
}
