import { Subscriber } from '../subscribers/subscriber';
import { IPlayer } from '../domain/player';

import { PlayerDecorator } from '../decorators/playerDecorator';

import { ProvidedPublisher } from './providedPublisher';
import { Publisher } from './publisher';

/** Message type for publication of player points changing. */
export interface PlayerPoints {

	/** Player name. */
	readonly playerName: string;

	/** Points. */
	readonly points: number;
}

/** Publisher for player points changing. */
export class PlayerPointsPublisher extends PlayerDecorator implements Publisher<PlayerPoints> {

	private readonly providedPublisher: ProvidedPublisher<PlayerPoints>;

	public constructor(player: IPlayer) {
		super(player);

		this.providedPublisher = new ProvidedPublisher(() => ({
			playerName: player.name,
			points: player.lastPoints,
		}));
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
