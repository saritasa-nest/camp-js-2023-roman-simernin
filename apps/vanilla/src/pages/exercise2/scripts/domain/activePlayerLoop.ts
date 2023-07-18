import { Player } from "./player";

/* Collection of players that return only player who not pass. */
export class ActivePlayerLoop implements IterableIterator<Player | null> {

    private readonly players: Player[];

    private currentIdex: number = -1;

    constructor(players: Player[]) {
        this.players = players;
    }

    private get passedPlayerIndexes() {
        return this.players
            .filter(player => player.passStatus)
            .map(player => this.players.indexOf(player));
    }

    /**
    * Provides there is any player who not pass.
    */
    public get activePlayersEnded() {
        return this.passedPlayerIndexes.length == this.players.length;
    }

    /**
    * Get next active player.
    */
    next(): IteratorResult<Player | null> {
        if (this.activePlayersEnded) {
            return {
                done: false,
                value: null
            };
        }

        this.currentIdex++;

        if (this.currentIdex == this.players.length) {
            this.currentIdex = 0;
        }

        if (this.passedPlayerIndexes.includes(this.currentIdex)) {
            this.next();
        }

        return {
            done: false,
            value: this.players[this.currentIdex]
        };
    }

    [Symbol.iterator](): IterableIterator<Player | null> {
        return this;
    }
}