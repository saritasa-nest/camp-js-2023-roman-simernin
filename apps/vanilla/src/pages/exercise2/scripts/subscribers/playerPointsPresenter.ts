import { PlayerPoints } from '../publishers/playerPointsPublisher';

import { Subscriber } from './subscriber';

/**
 * Present all dice roll and total points by players.
 */
export class PlayerPointsPresenter implements Subscriber<PlayerPoints> {
	private readonly playerPointsSums: Map<string, number> = new Map<string, number>();

	/** @inheritdoc */
	public update(message: PlayerPoints): void {
		let playerPointsSum = this.playerPointsSums.get(message.playerName);

		if (playerPointsSum === undefined) {
			playerPointsSum = message.points;
		} else {
			playerPointsSum += message.points;
		}

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
		const playerPointsElement = document.createElement('li');
		playerPointsElement.textContent = playerPoints.toString();

		const playerPointListElement = document.getElementById(`${playerName}-points-list`);

		if (playerPointListElement === null) {
			throw new Error('Player points list element is missed');
		}

		playerPointListElement.appendChild(playerPointsElement);
	}
}
