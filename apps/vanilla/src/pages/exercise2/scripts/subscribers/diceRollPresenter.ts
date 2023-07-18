import { CurrentDiceSide } from "../publishers/currentDiceSidePublisher";
import { Subscriber } from "./subscriber";

/* Present all dice rolls and total points for it. */
export class DiceRollPresenter implements Subscriber<CurrentDiceSide> {

    private dicePointsSum: number = 0;

    /** @inheritdoc */
    update(message: CurrentDiceSide): void {
        this.dicePointsSum += message.currentSide;

        this.presentUpdatedPointSum(this.dicePointsSum);
        this.presentAppendedPoints(message.currentSide);
    }

    private presentUpdatedPointSum(dicePointsSum: number): void {
        const dicePointSumElement = document.getElementById('dice-points-sum')!;
        dicePointSumElement.textContent = dicePointsSum.toString();
    }

    private presentAppendedPoints(dicePoints: number) {
        const dicePointsElement = document.createElement('li');
        dicePointsElement.textContent = dicePoints.toString();

        const dicePointListElement = document.getElementById('dice-points-list')!;
        dicePointListElement.appendChild(dicePointsElement);
    }
}