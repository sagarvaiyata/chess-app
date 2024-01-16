import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChessBoardView, NgxChessBoardService } from 'ngx-chess-board';
import { ChessGameService } from '../services/chess-board.service';
@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html'
})

export class ChessBoardComponent implements OnInit, AfterViewInit {
  boardSize = 600; 
  lightTileColor = '#EFDAB7';
  darkTileColor = '#B48866'; 
  boardId!: number;
  boardState!: any; 
  lastFen!: string; 

  @ViewChild('board', { static: false }) board!: NgxChessBoardView;
  @Output() moveMade = new EventEmitter<any[]>();

  constructor(private route: ActivatedRoute, private ngxChessBoardService: NgxChessBoardService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = +params['id' ];
      this.boardState = {};
    });

  }

  onMoveMade(event: any) {
    console.log(event, this.boardId);
    let output = [event, this.boardId];
    this.moveMade.emit(output);
  }

  flipBoard() {
    if (this.board) {
      this.board.reverse();
    }
  }

  ngAfterViewInit(){
    if (this.boardId === 2) {
      this.flipBoard(); 
    }
  }
}
