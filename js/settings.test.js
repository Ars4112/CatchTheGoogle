import { Settings } from "./settings";
import { GridSettings } from "./gridSettings";

describe("Settings", () => {
	let settings;
	beforeEach(() => {
		const gridSize = new GridSettings(10, 10).gridSize;
		settings = new Settings(gridSize).settings;
	});
	it("settings should be set", () => {
		expect(settings).toEqual({
			gridSize: { columnsCount: 10, rowsCount: 10 },
			jumpInterval: 1000,
			googleScores: 20, 
			playerScores : 0
		});

		const newSettings = {
			gridSize: { columnsCount: 9, rowsCount: 7 },
			jumpInterval: 1000,
		};
		settings = newSettings;

		expect(settings.gridSize.columnsCount).toBe(9);
		expect(settings.gridSize.rowsCount).toBe(7);
	});
});
