import { IPlayer } from '../domain/player';

/** Wrap Player for adding new functionality. */
export class PlayerDecorator implements IPlayer {

	public constructor(private readonly player: IPlayer) {
	}

	/** @inheritdoc */
	public get name(): string {
		return this.player.name;
	}

	/** @inheritdoc */
	public get lastPoints(): number {
		return this.player.lastPoints;
	}

	/** @inheritdoc */
	public get totalPoints(): number {
		return this.player.totalPoints;
	}

	/** @inheritdoc */
	public get winStatus(): boolean | undefined {
		return this.player.winStatus;
	}

	/** @inheritdoc */
	public get passStatus(): boolean {
		return this.player.passStatus;
	}

	/** @inheritdoc */
	public addPoints(points: number): void {
		this.player.addPoints(points);
	}

	/** @inheritdoc */
	public setWinStatus(winStatus: boolean) {
		this.player.setWinStatus(winStatus);
	}

	/** @inheritdoc */
	public pass(): void {
		this.player.pass();
	}
}
