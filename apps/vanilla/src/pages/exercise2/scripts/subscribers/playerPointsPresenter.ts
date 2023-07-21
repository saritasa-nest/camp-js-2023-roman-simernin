import { PlayerPoints } from '../publishers/playerPointsPublisher';

import { createPointsItemElement } from './createPointsItemElement';

import { Subscriber } from './subscriber';

/** Present all dice roll and total points by players. */
export class PlayerPointsPresenter implements Subscriber<PlayerPoints> {
	private readonly playerPointsSums = new Map<string, number>();

	/** @inheritdoc */
	public update(message: PlayerPoints): void {
		let playerPointsSum = this.playerPointsSums.get(message.playerName);

		playerPointsSum = playerPointsSum === undefined ?
			message.points :
			playerPointsSum + message.points;

		this.playerPointsSums.set(message.playerName, playerPointsSum);

		this.presentUpdatedPointSum(message.playerName, playerPointsSum);

		this.presentAppendedPoints(message.playerName, message.points);
	}

	private presentUpdatedPointSum(playerName: string, playerPointsSum: number): void {
		const playerPointsSumElement = document.getElementById(`${playerName}-points-sum`);

		if (playerPointsSumElement === null) {
			throw new Error('Player points sum element is missed');
		}

		playerPointsSumElement.textContent = playerPointsSum.toString();
	}

	private presentAppendedPoints(playerName: string, playerPoints: number): void {
		const playerPointsItemElement = createPointsItemElement(playerPoints);

		const playerPointListElement = document.getElementById(`${playerName}-points-list`);

		if (playerPointListElement === null) {
			throw new Error('Player points list element is missed');
		}

		playerPointListElement.appendChild(playerPointsItemElement);
	}
}
