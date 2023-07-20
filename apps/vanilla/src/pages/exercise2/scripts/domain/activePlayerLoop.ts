import { Player } from './player';

/** Collection of players that return only player who not pass. */
export class ActivePlayerLoop implements IterableIterator<Player | null> {

	private currentIndex = -1;

	public constructor(private readonly players: Player[]) {
	}

	private get passedPlayerIndexes(): number[] {
		return this.players
			.filter(player => player.passStatus)
			.map(player => this.players.indexOf(player));
	}

	/** Provides there is any player who not pass. */
	public get hasActivePlayers(): boolean {
		return this.passedPlayerIndexes.length !== this.players.length;
	}

	/** Get next active player. */
	public next(): IteratorResult<Player | null> {
		if (!this.hasActivePlayers) {
			return {
				done: false,
				value: null,
			};
		}

		this.currentIndex++;

		if (this.currentIndex === this.players.length) {
			this.currentIndex = 0;
		}

		if (this.passedPlayerIndexes.includes(this.currentIndex)) {
			this.next();
		}

		return {
			done: false,
			value: this.players[this.currentIndex],
		};
	}

	/** Using for enumeration in for..of circle. */
	public [Symbol.iterator](): IterableIterator<Player | null> {
		return this;
	}
}
