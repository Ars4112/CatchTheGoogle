import { RandomNumber } from "./utils.js";

export class Position {
	#columnCount;
	#rowCount;
	#googlePosition;
	#playerPosition;
    #randomPosition

	constructor(columnCount, rowCount) {
		this.#columnCount = columnCount;
		this.#rowCount = rowCount;
	}

    get randomPosition() {
        return this.#randomPosition
    }

	setPosition() {
       this.#randomPosition = { 
            x: new RandomNumber().getRendomIntegerNumber(0, this.#columnCount),
            y: new RandomNumber().getRendomIntegerNumber(0, this.#rowCount),
        }
		
	}
}
