import { Injectable } from '@angular/core';
import { BonusType } from '../models/bonus-type.enum';
import { Frame } from '../models/frame.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class BowlingService {
  private throwNumber: number = 0;

  // Note: I regret changing it from an array of throws so much, 
  // but most likely the db structure would have preferred the object and not array set up
  // and there wasnt much time left to redo everything

  private game: Game = {
    frames: [],
    isComplete: false,
    finalScore: 0,
    pinsInAlley: 10,
  };
  constructor() {}

  // NB: If this were a client - server set up, this logic would be kept in the backend
  // the games would be stored in a db so that you could play multiple by game id
  // in the interest of completing in a few hours and not having to set up rest and http calls on both fe and be, this is the first pass
  throw(pinsHit: number) {
    this.throwNumber++;
    this.convertToFrames(pinsHit);
    return this.game;
  }

  private convertToFrames(pinsHit: number) {
    // TODO: last frame check
    if (this.throwNumber > 20) {
      // do special end frame conditions
    } else if (this.throwNumber % 2 !== 0) {
      this.addFirstThrowInFrame(pinsHit);
    } else {
      this.addSecondThrowInFrame(pinsHit);
    }
  }

  private addSecondThrowInFrame(pinsHit: number) {
    let frame = this.game.frames.pop();
    if (frame) {
      frame.secondThrow = pinsHit;
      this.game.pinsInAlley = 10;
      // spare
      if (frame.secondThrow + frame.firstThrow == 10) {
        frame.bonus = BonusType.SPARE;
      }
      this.game.frames.push(frame);
      this.calculateFrameScores();
    }
  }

  private addFirstThrowInFrame(pinsHit: number) {
    let frame: Frame = {
      firstThrow: pinsHit,
      secondThrow: -1,
      bonus: BonusType.NONE,
      score: 0,
      isWaiting: true,
      runningTotal: -1,
    };

    this.game.pinsInAlley = 10 - pinsHit;

    // strike
    if (pinsHit === 10) {
      this.throwNumber++;
      this.game.pinsInAlley = 10;
      frame.bonus = BonusType.STRIKE;
      frame.secondThrow = 0;
    }

    this.game.frames.push(frame);

    if (pinsHit === 10) {
      this.calculateFrameScores();
    }
  }

  private calculateFrameScores() {
    this.game.frames.forEach((frame, index) => {
      if (frame.isWaiting) {
        let nextFrame;
        switch (frame.bonus) {
          case BonusType.NONE:
            frame.score = frame.firstThrow + frame.secondThrow;
            frame.isWaiting = false;
            break;
          case BonusType.SPARE:
            nextFrame = this.game.frames[index + 1];
            if (nextFrame) {
              frame.score = 10 + nextFrame.firstThrow;
              frame.isWaiting = false;
            }
            break;
          case BonusType.STRIKE:
            frame = this.calculateStrikeScore(index);
            break;
          default:
            console.error('How did it get here');
            break;
        }

        frame.runningTotal = this.calculateRunningTotal(index);
      }
    });
  }

  private calculateRunningTotal(index: number) {
    let previousFrame = this.game.frames[index - 1];
    if (index === 0) {
      return this.game.frames[index].score;
    } else if (previousFrame && !previousFrame.isWaiting) {
      return previousFrame.runningTotal + this.game.frames[index].score;
    } else {
      return -1;
    }
  }

  private calculateStrikeScore(index: number) {
    // TODO: this nested ifs makes me uncomfortable
    let frame = this.game.frames[index];
    let nextFrame = this.game.frames[index + 1];
    if (nextFrame) {
      if (nextFrame.bonus !== BonusType.STRIKE) {
        // SN
        frame.score = 10 + nextFrame.firstThrow + nextFrame.secondThrow;
        frame.isWaiting = false;
      } else {
        //SS
        let nextSecondFrame = this.game.frames[index + 2];
        if (nextSecondFrame) {
          if (nextSecondFrame.bonus !== BonusType.STRIKE) {
            // SSN
            frame.score = 20 + nextSecondFrame.firstThrow;
            frame.isWaiting = false;
          } else {
            //SSS
            frame.score = 30;
            frame.isWaiting = false;
          }
        }
      }
    }
    return frame;
  }
}
