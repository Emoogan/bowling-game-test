import { BonusType } from "./bonus-type.enum";

export interface Frame {
    firstThrow: number;
    secondThrow: number;
    thirdThrow?: number;
    bonus: BonusType;
    score: number;
    isWaiting: boolean; 
    runningTotal: number;
}