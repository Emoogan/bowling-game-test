import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowlingComponent } from './components/bowling/bowling.component';

const routes: Routes = [{ path: '', component: BowlingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BowlingRoutingModule { }
