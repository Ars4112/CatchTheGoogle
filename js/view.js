import { GAME_STATUSES, DIRECTION } from "./game.js";

export class View {
	#root;
    #select
	#onStartObserver;
	#onPlayerMovedObserver;
    #settingsGame = {
        gridSize: {columnsCount: 4, rowsCount: 4 }
    }
	constructor() {
		this.#root = document.getElementById("root");
       this.#select = document.getElementById("01");
		window.addEventListener("keyup", (event) => {
			switch (event.code) {
				case "ArrowUp":
					this.onPlayerMovedObserver(DIRECTION.UP);
					break;
				case "ArrowDown":
					this.onPlayerMovedObserver(DIRECTION.DOWN);
					break;
				case "ArrowLeft":
					this.onPlayerMovedObserver(DIRECTION.LEFT);
					break;
				case "ArrowRight":
					this.onPlayerMovedObserver(DIRECTION.RIGHT);
					break;
				default:
					break;
			}
		});
        
	}

	set onstart(observer) {
		this.#onStartObserver = observer;
	}

	set onplayermoved(observer) {
		this.onPlayerMovedObserver = observer;
	}

    get settingsGame() {
        return this.#settingsGame
    }

	render(dto) {
		this.#root = document.getElementById("root");
		this.#root.innerHTML = "";
        this.#getSettings(dto)

		if (dto.status === GAME_STATUSES.PENDING) {
			this.#renderStartScreen();
            
		} else if (dto.status === GAME_STATUSES.IN_PROGRESS) {
            
			this.#renderGameScreen(dto);
		} else if (dto.status === GAME_STATUSES.COMPLETED) {
			this.#showResultModal(dto);
		}
	}

	#getSettings(dto) {
		
		this.#select.addEventListener("change", (e) => {
            this.#settingsGame.gridSize.columnsCount = +e.target.value
            this.#settingsGame.gridSize.rowsCount = +e.target.value
		});
        this.#select.disabled = dto.status !== GAME_STATUSES.PENDING;
       
	}

	#renderStartScreen(dto) {
		const button = document.createElement("button");
		button.classList.add("button", "main-button");

		button.append("START GAME");
		button.addEventListener("click", async () => {
			this.#onStartObserver?.();
		});

		this.#root.append(button);
	}

	#showResultModal(dto) {
		const resultModalElement = document.querySelector("#modal").content.querySelector(".modal");
		const resultModalElementClone = resultModalElement.cloneNode(true);
		const buttonPlayAgain = resultModalElementClone.querySelector(".button");
		buttonPlayAgain.addEventListener("click", () => {
			this.#onStartObserver?.();
		});
		resultModalElementClone.querySelector(".title-modal").textContent = dto.message;
		resultModalElementClone.querySelector(".text-modal");
		resultModalElementClone.querySelector(".result-catch").textContent = 3;
		resultModalElementClone.querySelector(".result-miss").textContent = 20;
		this.#root.append(resultModalElementClone);
        this.#select.disabled = dto.status === GAME_STATUSES.PENDING;
	}

	#renderGameScreen(dto) {
		const google = document.createElement("img");
		google.src = "img/icons/googleIcon.svg";
		const player = document.createElement("img");
		player.src = "img/icons/man01.svg";
		const gameFieldElement = document.querySelector("#game-field").content.querySelector(".game-field");
		const gameFieldElementClone = gameFieldElement.cloneNode(true);
		const table = gameFieldElementClone.querySelector(".table").querySelector("tbody");
		for (let y = 0; y < dto.gridSize.rowsCount; y++) {
			const row = document.createElement("tr");
			for (let x = 0; x < dto.gridSize.columnsCount; x++) {
				const cell = document.createElement("td");
				cell.classList.add("cell");
				if (x === dto.playerPosition?.x && y === dto.playerPosition?.y) {
					cell.append(player);
				}
				if (x === dto.googlePosition?.x && y === dto.googlePosition?.y) {
					cell.append(google);
				}
				row.append(cell);
			}
			table.append(row);
		}
		this.#root.append(gameFieldElementClone);
	}
}
