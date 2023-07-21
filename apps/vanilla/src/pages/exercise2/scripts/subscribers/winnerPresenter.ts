import { PlayerWinStatus } from '../publishers/playerWinStatusPublisher';

import { Subscriber } from './subscriber';

/** Present who win and who lose the game. */
export class WinnerPresenter implements Subscriber<PlayerWinStatus> {

	/** @inheritdoc */
	public update(message: PlayerWinStatus): void {
		const playerPointsContainerElement = document.getElementById(`${message.playerName}-points-container`);

		if (playerPointsContainerElement === null) {
			throw new Error('Player points container element is missed');
		}

		if (message.winStatus) {
			playerPointsContainerElement.classList.add('gamer-points-container_winner');
		} else {
			playerPointsContainerElement.classList.add('gamer-points-container_looser');
		}
	}
}
