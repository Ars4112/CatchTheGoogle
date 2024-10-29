export class GridSettings {
	#gridSize;
	constructor(column, row) {
		this.#gridSize = { columnsCount: column, rowsCount: row };
	}

	get gridSize() {
		return this.#gridSize;
	}
}
