import { Publisher } from "./publisher";
import { Subscriber } from "../subscribers/subscriber";
import { Dice } from "../domain/dice";
import { ProvidedPublisher } from "./providedPublisher";
import { DiceDecorator } from "../decorators/diceDecorator";

/* Message type for publication of current dice side changing.*/
export interface CurrentDiceSide {
    currentSide: number;
}

/* Publisher for current dice side changing. */
export class CurrentDiceSidePublisher extends DiceDecorator implements Publisher<CurrentDiceSide> {

    private providedPublisher: ProvidedPublisher<CurrentDiceSide>;

    constructor(dice: Dice) {
        super(dice);

        this.providedPublisher = new ProvidedPublisher(() => {
            return {
                currentSide: dice.currentSide
            }
        });
    }

    /** @inheritdoc */
    public override roll(): void {
        super.roll();
        this.providedPublisher.notify();
    }

    /** @inheritdoc */
    public subscribe(subscriber: Subscriber<CurrentDiceSide>): void {
        this.providedPublisher.subscribe(subscriber);
    }

    /** @inheritdoc */
    public unsubscribe(subscriber: Subscriber<CurrentDiceSide>): void {
        this.providedPublisher.unsubscribe(subscriber);
    }

    /** @inheritdoc */
    public notify(): void {
        this.providedPublisher.notify();
    }
}