export class Controller {
	#model;
	#view;
	constructor(model, view) {
		(this.#model = model), (this.#view = view);
	}
	init() {
		this.#view.render(this.#mapModelToDTO());

		this.#view.onstart = () => {
			this.#start();
		};
		this.#view.onplayermoved = (direction) => {
			this.#model.movePlayer(direction);
		};
		this.#model.subscribe(() => {
			this.#view.render(this.#mapModelToDTO());
		});

		this.#model.setSettings (() => {
			return {...this.#view.settingsGame};
		});

		// this.#model.subscribe(() => {
		// 	this.#model.setSettings(() => {
		//         return this.#view.settingsGame;
		//     });
		// });
	}

	#start() {
		this.#model.start();
		this.#view.render(this.#mapModelToDTO());
	}

	#mapModelToDTO() {
		return {
			status: this.#model.status,
			playerPosition: this.#model.playerPosition,
			googlePosition: this.#model.googlePosition,
			message: this.#model.message,
			gridSize: this.#model.gridSize,
		};
	}
}
