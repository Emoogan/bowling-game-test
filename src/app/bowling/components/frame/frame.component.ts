import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BonusType } from '../../models/bonus-type.enum';
import { Frame } from '../../models/frame.model';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {
  @Input() set frame(frame: Frame) {
    this.updateFrame(frame);
  }
  
  firstElement!: string;
  secondElement!: string;
  score!: string;
  runningTotal!: string;

  constructor() {}

  ngOnInit(): void {}

  updateFrame(newFrame: Frame) {
    if (newFrame.bonus === BonusType.STRIKE) {
      this.firstElement = ' ';
      this.secondElement = 'X';
    } else if (newFrame.bonus === BonusType.SPARE) {
      this.firstElement = newFrame.firstThrow.toString();
      this.secondElement = '/';
    } else {
      this.firstElement = newFrame.firstThrow.toString();
      this.secondElement = newFrame.secondThrow === -1 ? ' ' :newFrame.secondThrow.toString();
    }

    this.score = newFrame.isWaiting ? 'W' : newFrame.score.toString();
    this.runningTotal = newFrame.isWaiting ? 'W' : newFrame.runningTotal?.toString();
  }
}
