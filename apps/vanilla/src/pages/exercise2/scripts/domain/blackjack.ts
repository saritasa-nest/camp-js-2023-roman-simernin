import { ActivePlayerLoop } from './activePlayerLoop';
import { IDice } from './dice';
import { IPlayer } from './player';

/** Contain logic for game Blackjack. */
export class Blackjack {

	private _isEnd = false;

	private readonly allPlayers: IPlayer[];

	private readonly activePlayers: ActivePlayerLoop;

	public constructor(
		players: IPlayer[],
		private readonly dice: IDice,
	) {

		if (players.length === 0) {
			throw new Error('Player count can not be zero');
		}

		this.allPlayers = players;
		this.activePlayers = new ActivePlayerLoop(players);
	}

	/** Provides game ended (there are no active players). */
	public get isEnd(): boolean {
		return this._isEnd;
	}

	/** Roll dice by next player and add points to him. */
	public rollDice(): void {
		if (this.isEnd) {
			throw new Error('Can not roll dice because game ended');
		}

		const activePlayerResult = this.activePlayers.next();

		if (activePlayerResult.done || activePlayerResult.value === null) {
			throw new Error('Can not roll dice without active players');
		}

		const currentPlayer = activePlayerResult.value;

		this.dice.roll();
		currentPlayer.addPoints(this.dice.currentSide);
	}

	/** Make pass by current player and end game if passed player is last. */
	public pass(): void {
		if (this.isEnd) {
			throw new Error('Can not make a pass because game ended');
		}

		const activePlayerResult = this.activePlayers.next();

		if (activePlayerResult.done || activePlayerResult.value === null) {
			throw new Error('Can not make a pass without active players');
		}

		const currentPlayer = activePlayerResult.value;

		currentPlayer.pass();

		if (!this.activePlayers.hasActivePlayers) {
			this.endGame();
		}
	}

	private endGame(): void {
		const maxAvailablePoints = 21;

		const availablePoints = this.allPlayers
			.map(player => player.totalPoints)
			.filter(points => points > 0 &&
				points <= maxAvailablePoints);

		const hasWinner = availablePoints.length !== 0;

		if (hasWinner) {
			const winnerPoints = Math.max(...availablePoints);

			for (const player of this.allPlayers) {
				player.setWinStatus(player.totalPoints === winnerPoints);
			}

		} else {
			for (const player of this.allPlayers) {
				player.setWinStatus(false);
			}
		}

		this._isEnd = true;
	}
}
