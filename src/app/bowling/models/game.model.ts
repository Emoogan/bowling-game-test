import { Frame } from "./frame.model";

export interface Game {
    frames: Frame[];
    isComplete: boolean;
    finalScore: number;
    pinsInAlley: number;
}