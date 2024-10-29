import { Controller } from "./js/controller.js";
import { View } from "./js/view.js";
import { Game } from "./js/game.js";
import { Settings } from "./js/settings.js";
import { GridSettings } from "./js/gridSettings.js";


const view = new View()
const settings = new Settings()
const game = new Game(settings)
const controller = new Controller(game, view)

// game.start()

controller.init()