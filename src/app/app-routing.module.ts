import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'app-chess-board/:id', component: ChessBoardComponent },
  { path: '**', component: MainPageComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
