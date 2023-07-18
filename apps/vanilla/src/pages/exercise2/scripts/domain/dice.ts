/* Domain model for dice. */
export class Dice {

    private sidesCountValue: number = 6;

    private currentSideValue: number | undefined;

    /**
    * Set dice side count value.
    * @param sideCount - Provide side count for dice.
    */
    public set sideCount(sideCount: number) {
        if (sideCount <= 0) {
            throw 'Side count can not be equal or less then zero'
        }

        this.sidesCountValue = sideCount;
    }

    /**
    * Get dice current side.
    */
    public get currentSide(): number {
        if (this.currentSideValue === undefined) {
            throw 'Current is not defined, need to roll before';
        }

        return this.currentSideValue;
    }

    /**
    * Randomize new dice side.
    */
    public roll(): void {
        this.currentSideValue = this.getRandomNumber(this.sidesCountValue);
    }

    private getRandomNumber(maxValue: number): number {
        return Math.floor(Math.random() * maxValue) + 1;
    }
}