export class Settings {
	#settings;
	constructor() {
		this.#settings = {
			gridSize: {columnsCount: 5, rowsCount: 4 },
			jumpInterval: 1000,
			googleScores: 20,
			playerScores: 0,
		};
	}

	set changeSettings(setting) {
		
		if (setting.gridSize && setting.gridSize.columnsCount * setting.gridSize.rowsCount < 4) {
			throw new Error("401: Cells count should be 4 or more");
		}
// debugger
		this.#settings = {
			...this.#settings,
			gridSize: setting.gridSize ? { ...setting.gridSize } : this.#settings.gridSize,
			jumpInterval: setting.jumpInterval ? setting.jumpInterval : this.#settings.jumpInterval,
		};
	}
	get settings() {
	
		return { ...this.#settings, gridSize: { ...this.#settings.gridSize } };
	}
}
