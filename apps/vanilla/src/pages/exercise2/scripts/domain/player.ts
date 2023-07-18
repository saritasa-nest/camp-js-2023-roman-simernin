/* Domain model for player */
export class Player {

    private nameValue: string = 'no name';
    private lastPointsValue: number = 0;
    private totalPointsValue: number = 0;
    private winStatusValue: boolean | undefined;
    private passStatusValue: boolean = false;

    /**
    * Set player name.
    * @param name - Player name.
    */
    public set name(name: string) {
        this.nameValue = name;
    }

    /**
    * Get player name.
    */
    public get name() {
        return this.nameValue;
    }


    /**
    * Get last points for current player.
    */
    public get lastPoints(): number {
        return this.lastPointsValue;
    }


    /**
    * Get sum of all points for current player.
    */
    public get totalPoints(): number {
        return this.totalPointsValue;
    }

    /**
    * Set winning status.
    * @param winStatus - Provides player win or not.
    */
    public set winStatus(winStatus: boolean) {
        this.winStatusValue = winStatus;
    }

    /**
    * Get winning status.
    */
    public get winStatus(): boolean | undefined {
        return this.winStatusValue;
    }

    /**
    * Get status that provides user passed or not.
    */
    public get passStatus(): boolean {
        return this.passStatusValue;
    }

    /**
    * Add points.
    * @param points - Points.
    */
    public addPoints(points: number) {
        if (this.passStatusValue) {
            throw 'Can not add points when player make a pass';
        }

        if (points <= 0) {
            throw 'Can not add zero or less points';
        }

        this.lastPointsValue = points;
        this.totalPointsValue += points;
    }

    /**
    * Make player be passed. After pass player can not add points.
    */
    public pass() {
        this.passStatusValue = true;
    }
}