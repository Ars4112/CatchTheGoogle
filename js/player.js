import { Unit } from "./unit";

export class Player extends Unit {
	constructor(position, id) {
		super(position)
        this.id = id;
	}
}