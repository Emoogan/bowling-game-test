import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BowlingRoutingModule } from './bowling-routing.module';
import { BowlingComponent } from './components/bowling/bowling.component';
import { BowlingService } from './service/bowling.service';
import { FrameComponent } from './components/frame/frame.component';


@NgModule({
  declarations: [
    BowlingComponent,
    FrameComponent
  ],
  imports: [
    CommonModule,
    BowlingRoutingModule
  ],
  providers: [BowlingService]
})
export class BowlingModule { }
