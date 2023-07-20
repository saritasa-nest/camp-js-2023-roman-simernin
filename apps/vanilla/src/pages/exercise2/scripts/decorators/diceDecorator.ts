import { Dice } from '../domain/dice';

/** Wrap Dice for adding new functionality. */
export abstract class DiceDecorator extends Dice {

	public constructor(private readonly dice: Dice) {
		super();
	}

	/** @inheritdoc */
	public override set sideCount(sideCount: number) {
		this.dice.sideCount = sideCount;
	}

	/** @inheritdoc */
	public override get currentSide(): number {
		return this.dice.currentSide;
	}

	/** @inheritdoc */
	public override roll(): void {
		this.dice.roll();
	}
}
