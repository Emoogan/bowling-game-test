import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Frame } from '../../models/frame.model';
import { Game } from '../../models/game.model';
import { BowlingService } from '../../service/bowling.service';

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.scss']
})
export class BowlingComponent implements OnInit {

  game!: Game;
  pinsLeft: number = 10;
  lastThrow: number = -1;

  constructor(private bowlingService: BowlingService) { }

  ngOnInit(): void {
  }

  throw(){
    this.lastThrow = this.numberOfPinsHit(this.pinsLeft);
    this.game = this.bowlingService.throw(this.lastThrow);
    this.pinsLeft = this.game.pinsInAlley;
  }

  numberOfPinsHit(pinCount: number) {
    return Math.floor(Math.random() * (pinCount + 1))
  }

  customTB(index: number, frame: Frame){
    return ` ${index} - ${frame.firstThrow} - ${frame.secondThrow} - ${frame.score}`
  }

}
