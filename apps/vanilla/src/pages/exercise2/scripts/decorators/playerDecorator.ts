import { Player } from '../domain/player';

/** Wrap Player for adding new functionality. */
export class PlayerDecorator extends Player {

	public constructor(private readonly player: Player) {
		super();
	}

	/** @inheritdoc */
	public override set name(name: string) {
		this.player.name = name;
	}

	/** @inheritdoc */
	public override get name(): string {
		return this.player.name;
	}

	/** @inheritdoc */
	public override get lastPoints(): number {
		return this.player.lastPoints;
	}

	/** @inheritdoc */
	public override get totalPoints(): number {
		return this.player.totalPoints;
	}

	/** @inheritdoc */
	public override set winStatus(winStatus: boolean) {
		this.player.winStatus = winStatus;
	}

	/** @inheritdoc */
	public override get winStatus(): boolean | undefined {
		return this.player.winStatus;
	}

	/** @inheritdoc */
	public override get passStatus(): boolean {
		return this.player.passStatus;
	}

	/** @inheritdoc */
	public override addPoints(points: number): void {
		this.player.addPoints(points);
	}

	/** @inheritdoc */
	public override pass(): void {
		this.player.pass();
	}
}
