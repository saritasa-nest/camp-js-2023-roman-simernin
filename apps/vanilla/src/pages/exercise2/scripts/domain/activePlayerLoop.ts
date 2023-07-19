import { Player } from './player';

/**
 * Collection of players that return only player who not pass.
 */
export class ActivePlayerLoop implements IterableIterator<Player | null> {

	private readonly players: Player[];

	private currentIdex = -1;

	public constructor(players: Player[]) {
		this.players = players;
	}

	private get passedPlayerIndexes(): number[] {
		return this.players
			.filter(player => player.passStatus)
			.map(player => this.players.indexOf(player));
	}

	/**
	 * Provides there is any player who not pass.
	 */
	public get activePlayersEnded(): boolean {
		return this.passedPlayerIndexes.length === this.players.length;
	}

	/**
	 * Get next active player.
	 */
	public next(): IteratorResult<Player | null> {
		if (this.activePlayersEnded) {
			return {
				done: false,
				value: null,
			};
		}

		this.currentIdex++;

		if (this.currentIdex === this.players.length) {
			this.currentIdex = 0;
		}

		if (this.passedPlayerIndexes.includes(this.currentIdex)) {
			this.next();
		}

		return {
			done: false,
			value: this.players[this.currentIdex],
		};
	}

	/**
	 * Using for enumeration in for..of circle.
	 */
	public [Symbol.iterator](): IterableIterator<Player | null> {
		return this;
	}
}
