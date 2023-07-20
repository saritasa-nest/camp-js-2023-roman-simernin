import { Subscriber } from '../subscribers/subscriber';
import { IPlayer } from '../domain/player';

import { PlayerDecorator } from '../decorators/playerDecorator';

import { ProvidedPublisher } from './providedPublisher';
import { Publisher } from './publisher';

/** Message type for publication of player winning status changing. */
export interface PlayerWinStatus {

	/** Player name. */
	readonly playerName: string;

	/** Winning status. */
	readonly winStatus: boolean;
}

/** Publisher for player winning status changing. */
export class PlayerWinStatusPublisher extends PlayerDecorator implements Publisher<PlayerWinStatus> {

	private readonly providedPublisher: ProvidedPublisher<PlayerWinStatus>;

	public constructor(player: IPlayer) {
		super(player);

		this.providedPublisher = new ProvidedPublisher(() => {
			if (player.winStatus === undefined) {
				throw new Error('Play win status is not defined');
			}

			return {
				playerName: player.name,
				winStatus: player.winStatus,
			};
		});
	}

	/** @inheritdoc */
	public override setWinStatus(winStatus: boolean) {
		super.setWinStatus(winStatus);
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
