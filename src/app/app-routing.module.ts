import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bowl',
    loadChildren: () =>
      import('./bowling/bowling.module').then((m) => m.BowlingModule),
  },
  { path: '', redirectTo: '/bowl', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
