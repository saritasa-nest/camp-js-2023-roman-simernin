import { Subscriber } from '../subscribers/subscriber';
import { Dice } from '../domain/dice';

import { DiceDecorator } from '../decorators/diceDecorator';

import { ProvidedPublisher } from './providedPublisher';
import { Publisher } from './publisher';

/**
 * Message type for publication of current dice side changing.
 */
export interface CurrentDiceSide {

	/**
	 * Current side.
	 */
	currentSide: number;
}

/**
 * Publisher for current dice side changing.
 */
export class CurrentDiceSidePublisher extends DiceDecorator implements Publisher<CurrentDiceSide> {

	private providedPublisher: ProvidedPublisher<CurrentDiceSide>;

	public constructor(dice: Dice) {
		super(dice);

		this.providedPublisher = new ProvidedPublisher(() => ({
			currentSide: dice.currentSide,
		}));
	}

	/** @inheritdoc */
	public override roll(): void {
		super.roll();
		this.providedPublisher.notify();
	}

	/** @inheritdoc */
	public subscribe(subscriber: Subscriber<CurrentDiceSide>): void {
		this.providedPublisher.subscribe(subscriber);
	}

	/** @inheritdoc */
	public unsubscribe(subscriber: Subscriber<CurrentDiceSide>): void {
		this.providedPublisher.unsubscribe(subscriber);
	}

	/** @inheritdoc */
	public notify(): void {
		this.providedPublisher.notify();
	}
}
