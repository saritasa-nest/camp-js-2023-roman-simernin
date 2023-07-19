import { createBlackjack } from "./scripts/createBlackjack";
import { DiceRollPresenter } from "./scripts/subscribers/diceRollPresenter";
import { PlayerPointsPresenter } from "./scripts/subscribers/playerPointsPresenter";
import { WinnerPresenter } from "./scripts/subscribers/winnerPresenter";

const blackjackCreationResult = createBlackjack({
    diceSideCount: 6,
    playerNames: ['computer', 'self'],
    currentDiceSideSubscriber: new DiceRollPresenter(),
    playerPointsSubscriber: new PlayerPointsPresenter(),
    playerWinStatusSubscriber: new WinnerPresenter()
});

const blackjack = blackjackCreationResult.blackjackInstanse;

const rollButton = document.getElementById("roll-button")!;
const passButton = document.getElementById("pass-button")!;

rollButton.addEventListener("click", function () {
    blackjack.rollDice();
});

passButton.addEventListener("click", function () {
    blackjack.pass();

    if (blackjack.gameEnded) {
        blackjackCreationResult.clearSubscriptions();

        rollButton.classList.add('blackjack-actions-container__action--game-ended');
        passButton.classList.add('blackjack-actions-container__action--game-ended');
    }
});