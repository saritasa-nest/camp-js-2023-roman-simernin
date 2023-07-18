import { Publisher } from "./publisher";
import { Subscriber } from "../subscribers/subscriber";
import { Player } from "../domain/player";
import { ProvidedPublisher } from "./providedPublisher";
import { PlayerDecorator } from "../decorators/playerDecorator";

/* Message type for publication of player winning status changing.*/
export interface PlayerWinStatus {
    playerName: string;
    winStatus: boolean;
}

/* Publisher for player winning status changing. */
export class PlayerWinStatusPublisher extends PlayerDecorator implements Publisher<PlayerWinStatus> {

    private providedPublisher: ProvidedPublisher<PlayerWinStatus>;

    constructor(player: Player) {
        super(player);

        this.providedPublisher = new ProvidedPublisher(() => {
            if (player.winStatus === undefined) {
                throw 'Play win status is not defined';
            }

            return {
                playerName: player.name,
                winStatus: player.winStatus
            }
        });
    }

    /** @inheritdoc */
    public override set winStatus(winStatus: boolean) {
        super.winStatus = winStatus;
        this.providedPublisher.notify();
    }

    /** @inheritdoc */
    public subscribe(subscriber: Subscriber<PlayerWinStatus>): void {
        this.providedPublisher.subscribe(subscriber);
    }

    /** @inheritdoc */
    public unsubscribe(subscriber: Subscriber<PlayerWinStatus>): void {
        this.providedPublisher.unsubscribe(subscriber);
    }

    /** @inheritdoc */
    public notify(): void {
        this.providedPublisher.notify();
    }
}