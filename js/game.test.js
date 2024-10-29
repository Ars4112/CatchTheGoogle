import { Game } from "./game.js";
import { Position } from "./position.js";
import { Settings } from "./settings";

// const initialPosition = { x: 5, y: 5 };
//    Game.mockImplementation(() => ({
//     playerPosition: initialPosition,
//    }));

// const staticMethodMock = jest
//   .spyOn(Game, 'playerPosition ')
//   .mockImplementation(() => ({x: 3, y: 3}));

describe("Game", () => {
	let game;
	let settings;
	beforeEach(() => {
		settings = new Settings().settings = {
			gridSize: { columnsCount: 9, rowsCount: 7 },
			jumpInterval: 1,
		};
		game = new Game(settings);
	});

	it("should be change status", () => {
		expect(game.status).toBe("pending");
		game.start();
		expect(game.status).toBe("in_progress");
	});

	it("google position after start", () => {
		for (let i = 0; i < 10; i++) {
			game.start();
			expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
			expect(game.googlePosition.x).toBeLessThan(settings.gridSize.columnsCount);
			expect(game.googlePosition.y).toBeGreaterThanOrEqual(0);
			expect(game.googlePosition.y).toBeLessThan(settings.gridSize.rowsCount);
		}
	});
	it("google position after interval", async () => {
		for (let i = 0; i < 10; i++) {
			game.start();
			const position1 = game.googlePosition;
			await delay(1);
			const position2 = game.googlePosition;
			expect(position1).not.toEqual(position2);
		}
	});
	it("should initialize player position ", () => {
		for (let i = 0; i < 10; i++) {
			game.start();
			expect(game.playerPosition.x).toBeGreaterThanOrEqual(0);
			expect(game.playerPosition.x).toBeLessThan(settings.gridSize.columnsCount);
			expect(game.playerPosition.y).toBeGreaterThanOrEqual(0);
			expect(game.playerPosition.y).toBeLessThan(settings.gridSize.rowsCount);
		}
	});
	it("move player", () => {
		const getterMethodMock = jest
			.spyOn(Position.prototype, "randomPosition", "get")
			.mockImplementation(() => ({ x: 3, y: 3 })); 

	
 
		settings = {
			gridSize: { columnsCount: 3, rowsCount: 3 },
			jumpInterval: 100000,
		};

		game = new Game(settings); 

	

		game.startPlayerPosition();

		console.log(game.playerPosition);
expect(game.playerPosition.y).toBe(3)
		game.movePlayer("UP");
		console.log(game.playerPosition);
		expect(game.playerPosition.y).toBe(2) 
		game.movePlayer("UP"); 
		expect(game.playerPosition.y).toBe(1)
		console.log(game.playerPosition);
		game.movePlayer("UP");
		expect(game.playerPosition.y).toBe(0)
		console.log(game.playerPosition);
		game.movePlayer("UP");  
		console.log(game.playerPosition);
		expect(game.playerPosition.y).toBe(0)
		game.movePlayer("UP");
		expect(game.playerPosition.y).toBe(0)

		console.log(game.playerPosition);
	});
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
