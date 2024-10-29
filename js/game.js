import { Position } from "./position.js";

export class Game {
	#status = GAME_STATUSES.PENDING;
	#settings;
	#googlePosition = null;
	#playerPosition = null;
	#googleScores;
	#playerStatus = PLAYER_STATUSES.PENDING;
	#message = "";
	#subscribers = [];

	constructor(settings) {
		this.#settings = settings;
		
		console.log(this.#settings);
	}

	#newSettings

	setSettings(setting) {
		
		this.#newSettings = setting;
		
	}

	

	subscribe(listener) {
		this.#subscribers.push(listener);
		return () => {
			this.#subscribers = this.#subscribers.filter((i) => i !== listener);
		};
	}

	#notify() {
		this.#subscribers.forEach((i) => i());
	}

	start() {
		this.#status = GAME_STATUSES.IN_PROGRESS;
		this.#googleScores = this.#settings.googleScores;
		this.#settings.changeSettings = this.#newSettings?.()
		this.startPlayerPosition();
		this.#jumpGoogle();
		this.#notify();
		
		const googleJumpInterval = setInterval(() => {
			this.#jumpGoogle();
			this.#googleScoreСounter();
			this.#notify();
			if (this.#status === GAME_STATUSES.COMPLETED) {
				clearInterval(googleJumpInterval);
				this.#googlePosition = null;
				this.#playerPosition = null;
				this.#notify();
				return;
			}
		}, this.#settings.settings.jumpInterval);
	}

	get status() {
		return this.#status;
	}
	get message() {
		return this.#message;
	}

	get gridSize() {
		return this.#settings.settings.gridSize;
	}

	get googlePosition() {
		return this.#googlePosition;
	}

	get playerPosition() {
		return this.#playerPosition;
	}

	startPlayerPosition() {
		const { columnsCount, rowsCount } = this.#settings.settings.gridSize;

		const plaerPosition = new Position(columnsCount, rowsCount);
		plaerPosition.setPosition();

		this.#playerPosition = plaerPosition.randomPosition;
	}

	#jumpGoogle() {
		const { columnsCount, rowsCount } = this.#settings.settings.gridSize;

		const newGooglePosition = new Position(columnsCount, rowsCount);
		newGooglePosition.setPosition();
		if (
			(newGooglePosition.randomPosition.x === this.#googlePosition?.x &&
				newGooglePosition.randomPosition.y === this.#googlePosition?.y) ||
			(newGooglePosition.randomPosition.x === this.#playerPosition?.x &&
				newGooglePosition.randomPosition.y === this.#playerPosition?.y)
		)
			this.#jumpGoogle();
		else this.#googlePosition = newGooglePosition.randomPosition;
	}
	movePlayer(direction) {
		let newPosition = { ...this.#playerPosition };

		switch (direction) {
			case DIRECTION.UP:
				newPosition.y--;
				break;
			case DIRECTION.DOWN:
				newPosition.y++;
				break;
			case DIRECTION.LEFT:
				newPosition.x--;
				break;
			case DIRECTION.RIGHT:
				newPosition.x++;
				break;
			default:
				throw new Error("Invalid direction");
		}

		if (!this.#isInsideGrid(newPosition)) {
			return;
		}

		if (newPosition.x === this.#googlePosition?.x && newPosition.y === this.#googlePosition?.y) {
			this.finishGame(true);
			return;
		}

		this.#playerPosition = newPosition;

		this.#notify();
	}

	#isInsideGrid(newPosition) {
		return (
			0 <= newPosition.x &&
			newPosition.x < this.#settings.settings.gridSize.columnsCount &&
			0 <= newPosition.y &&
			newPosition.y < this.#settings.settings.gridSize.rowsCount
		);
	}

	#googleScoreСounter() {
		if (this.#googleScores <= 0) {
			this.finishGame(false);

			return;
		}
		this.#googleScores--;
	}

	finishGame(result) {
		this.#message = result ? MESSAGE.WIN : MESSAGE.LOSE;
		this.#status = GAME_STATUSES.COMPLETED;
		this.#playerStatus = result ? PLAYER_STATUSES.WIN : PLAYER_STATUSES.LOSE;
		this.#googlePosition = null;
		this.#playerPosition = null;
		console.log(this.#playerStatus);
		this.#notify();
	}
}

export const GAME_STATUSES = {
	PENDING: "pending",
	IN_PROGRESS: "in_progress",
	COMPLETED: "completed",
};

export const MESSAGE = {
	LOSE: "YOU LOSE",
	WIN: "YOU WIN",
};

export const DIRECTION = {
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT",
};
export const PLAYER_STATUSES = {
	PENDING: "PENDING",
	LOSE: "LOSE",
	WIN: "WIN",
};
