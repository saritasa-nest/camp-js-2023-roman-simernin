import { CurrentDiceSide } from '../publishers/currentDiceSidePublisher';

import { Subscriber } from './subscriber';

/**
 * Present all dice rolls and total points for it.
 */
export class DiceRollPresenter implements Subscriber<CurrentDiceSide> {

	private dicePointsSum = 0;

	/** @inheritdoc */
	public update(message: CurrentDiceSide): void {
		this.dicePointsSum += message.currentSide;

		this.presentUpdatedPointSum(this.dicePointsSum);
		this.presentAppendedPoints(message.currentSide);
	}

	private presentUpdatedPointSum(dicePointsSum: number): void {
		const dicePointSumElement = document.getElementById('dice-points-sum');

		if (dicePointSumElement === null) {
			throw new Error('Dice points sum element is missed');
		}

		dicePointSumElement.textContent = dicePointsSum.toString();
	}

	private presentAppendedPoints(dicePoints: number): void {
		const dicePointsElement = document.createElement('li');
		dicePointsElement.textContent = dicePoints.toString();

		const dicePointListElement = document.getElementById('dice-points-list');

		if (dicePointListElement === null) {
			throw new Error('Dice points list element is missed');
		}

		dicePointListElement.appendChild(dicePointsElement);
	}
}
