import { PlayerWinStatus } from "../publishers/playerWinStatusPublisher";
import { Subscriber } from "./subscriber";

/* Present who win and who lose the game. */
export class WinnerPresenter implements Subscriber<PlayerWinStatus> {
    /** @inheritdoc */
    update(message: PlayerWinStatus): void {
        const playerPointsSumElement = document.getElementById(`${message.playerName}-points-container`)!;

        if (message.winStatus === true) {
            playerPointsSumElement.classList.add('gamer-points-container--winner');
        }
        else {
            playerPointsSumElement.classList.add('gamer-points-container--looser');
        }
    }
}