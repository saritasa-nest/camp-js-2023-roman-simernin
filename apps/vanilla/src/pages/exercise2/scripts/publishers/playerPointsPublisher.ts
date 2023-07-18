import { Publisher } from "./publisher";
import { Subscriber } from "../subscribers/subscriber";
import { Player } from "../domain/player";
import { ProvidedPublisher } from "./providedPublisher";
import { PlayerDecorator } from "../decorators/playerDecorator";

/* Message type for publication of player points changing.*/
export interface PlayerPoints {
    playerName: string;
    points: number;
}

/* Publisher for player points changing. */
export class PlayerPointsPublisher extends PlayerDecorator implements Publisher<PlayerPoints> {

    private providedPublisher: ProvidedPublisher<PlayerPoints>;

    constructor(player: Player) {
        super(player);

        this.providedPublisher = new ProvidedPublisher(() => {
            return {
                playerName: player.name,
                points: player.lastPoints
            }
        });
    }

    /** @inheritdoc */
    public override addPoints(points: number): void {
        super.addPoints(points);
        this.providedPublisher.notify();
    }

    /** @inheritdoc */
    public subscribe(subscriber: Subscriber<PlayerPoints>): void {
        this.providedPublisher.subscribe(subscriber);
    }

    /** @inheritdoc */
    public unsubscribe(subscriber: Subscriber<PlayerPoints>): void {
        this.providedPublisher.unsubscribe(subscriber);
    }

    /** @inheritdoc */
    public notify(): void {
        this.providedPublisher.notify();
    }
}