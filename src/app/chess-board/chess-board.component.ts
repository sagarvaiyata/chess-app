import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChessBoardView, NgxChessBoardService } from 'ngx-chess-board';
import { ChessGameService } from '../services/chess-board.service';
@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html'
})

export class ChessBoardComponent implements OnInit, AfterViewInit {
  boardSize: number = 600; 
  lightTileColor: string = '#EFDAB7';
  darkTileColor: string = '#B48866'; 
  boardId: string = '1';
  fenString: string = '';

  @ViewChild('board', { static: false }) board!: NgxChessBoardView;
  @Output() moveMade = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private chessGameService: ChessGameService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = params['id' ];
    });
    this.chessGameService.boardUpdates$.subscribe((updates) => {
      console.log(updates.get(this.boardId))
      const fen = updates.get(this.boardId);
      if (fen) {
        this.board.setFEN(fen[1]);
        console.log(fen)
      }
    });
  }

  onMoveMade(event: any) {
    let output = event;
    const fen = event.fen;
    const boardId = this.boardId;
    console.log(event);

    if(this.boardId === '2' && event && event.fen){
      this.board.setFEN(fen)
      this.flipBoard();
    }


    if(event && event.fen){
      this.chessGameService.updateBoard({ boardId, fen });
    }
  }

  flipBoard() {
    if (this.board) {
      this.board.reverse();
    }
  }

  ngAfterViewInit(){
    if (this.boardId === '2') {
      this.flipBoard(); 

    }
  }
}
