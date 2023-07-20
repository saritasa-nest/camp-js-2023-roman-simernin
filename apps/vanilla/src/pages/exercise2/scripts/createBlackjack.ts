import { Blackjack } from './domain/blackjack';
import { Dice } from './domain/dice';
import { Player } from './domain/player';
import { CurrentDiceSide, CurrentDiceSidePublisher } from './publishers/currentDiceSidePublisher';
import { PlayerPoints, PlayerPointsPublisher } from './publishers/playerPointsPublisher';
import { PlayerWinStatus, PlayerWinStatusPublisher } from './publishers/playerWinStatusPublisher';
import { Subscriber } from './subscribers/subscriber';

/** Unsubscribe function type. */
type UnsubscribeFunction = () => void;

/** Blackjack creation parameters. */
export interface BlackjackParameters {

	/** Dice side count. */
	readonly diceSideCount: number;

	/** Player names. */
	readonly playerNames: string[];

	/** Current dice side subscriber. */
	readonly currentDiceSideSubscriber: Subscriber<CurrentDiceSide>;

	/** Player points subscriber. */
	readonly playerPointsSubscriber: Subscriber<PlayerPoints>;

	/** Player win status subscriber. */
	readonly playerWinStatusSubscriber: Subscriber<PlayerWinStatus>;
}

/** Blackjack creation result. */
export interface BlackjackCreationResult {

	/** Blackjack instanse. */
	readonly blackjackInstanse: Blackjack;

	/** Clear subscriptions. */
	readonly clearSubscriptions: () => void;
}

/**
 * Initialize Blackjack game.
 * @param parameters - Blackjack parameters.
 */
export function createBlackjack(parameters: BlackjackParameters): BlackjackCreationResult {
	const dice = new Dice();

	const currentDiceSidePublisher = new CurrentDiceSidePublisher(dice);
	currentDiceSidePublisher.subscribe(parameters.currentDiceSideSubscriber);

	const players: Player[] = [];
	const playerUnsubscribes: UnsubscribeFunction[] = [];

	for (const playerName of parameters.playerNames) {
		const player = new Player();
		player.name = playerName;

		const playerPointsPublisher = new PlayerPointsPublisher(player);
		playerPointsPublisher.subscribe(parameters.playerPointsSubscriber);
		playerUnsubscribes.push(() => playerPointsPublisher.unsubscribe(parameters.playerPointsSubscriber));

		const playerWinStatusSubscriber = new PlayerWinStatusPublisher(playerPointsPublisher);
		playerWinStatusSubscriber.subscribe(parameters.playerWinStatusSubscriber);
		playerUnsubscribes.push(() => playerWinStatusSubscriber.unsubscribe(parameters.playerWinStatusSubscriber));

		players.push(playerWinStatusSubscriber);
	}

	const blackjack = new Blackjack(players, currentDiceSidePublisher);

	const clearSubscriptions: () => void = () => {
		currentDiceSidePublisher.unsubscribe(parameters.currentDiceSideSubscriber);

		for (const playerUnsubscribe of playerUnsubscribes) {
			playerUnsubscribe();
		}
	};

	return {
		blackjackInstanse: blackjack,
		clearSubscriptions,
	};
}
