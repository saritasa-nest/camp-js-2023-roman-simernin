import { ActivePlayerLoop } from "./activePlayerLoop";
import { Dice } from "./dice";
import { Player } from "./player";

/* Contain logic for game Blackjack.*/
export class Blackjack {

    private gameEndedValue: boolean = false;

    private readonly dice: Dice;
    private readonly allPlayers: Player[];
    private readonly activePlayers: ActivePlayerLoop;

    constructor(dice: Dice, players: Player[]) {
        if (players.length === 0) {
            throw 'Player count can not be zero';
        }

        this.dice = dice;
        this.allPlayers = players;
        this.activePlayers = new ActivePlayerLoop(players);
    }

    /*
    * Provides game ended (there are no active players).
    */
    public get gameEnded(): boolean {
        return this.gameEndedValue;
    }

    /*
    * Roll dice by next player and add points to him.
    */
    public rollDice(): void {
        if (this.gameEndedValue) {
            throw 'Can not roll dice because game ended';
        };

        const activePlayerResult = this.activePlayers.next();

        if (activePlayerResult.done || activePlayerResult.value === null) {
            throw 'Can not roll dice without active players';
        }

        const currentPlayer: Player = activePlayerResult.value;

        this.dice.roll();
        currentPlayer.addPoints(this.dice.currentSide);
    }

    /*
    * Make pass by current player and end game if passed player is last.
    */
    public pass(): void {
        if (this.gameEndedValue) {
            throw 'Can not make a pass because game ended';
        };

        const activePlayerResult = this.activePlayers.next();

        if (activePlayerResult.done || activePlayerResult.value === null) {
            throw 'Can not make a pass without active players';
        }

        const currentPlayer: Player = activePlayerResult.value;

        currentPlayer.pass();

        if (this.activePlayers.activePlayersEnded) {
            this.endGame();
        }
    }

    private endGame(): void {
        const maxAvailablePoints = 21;

        const availablePoints = this.allPlayers
            .map(player => player.totalPoints)
            .filter(points => points > 0
                && points <= maxAvailablePoints);

        const noWinner = availablePoints.length === 0;

        if (noWinner) {
            for (const player of this.allPlayers) {
                player.winStatus = false;
            }
        }
        else {
            const winnerPoints = Math.max(...availablePoints);

            for (const player of this.allPlayers) {
                if (player.totalPoints === winnerPoints) {
                    player.winStatus = true;
                }
                else {
                    player.winStatus = false;
                }
            }
        }

        this.gameEndedValue = true;
    }
}