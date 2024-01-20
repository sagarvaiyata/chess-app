import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  activeBoardId: string = '1';
  fenString: string = '';

  @ViewChild('board', { static: false }) board!: NgxChessBoardView;
  @Output() moveMade = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute, 
    private chessGameService: ChessGameService, 
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = params['id' ];
    });

    this.chessGameService.boardUpdates$.subscribe((updates) => {
      this.chessGameService.activeBoard$.subscribe((activeBoardId) => {
        this.activeBoardId = activeBoardId;
      });
      updates.forEach((fen, boardId) => {
        if(fen){
        
          if(this.boardId === '2'){
            this.board.setFEN(fen)
            this.flipBoard();
          }
        }
      })
      
    });
  }

  onMoveMade(event: any) {
    const fen = event.fen;
    const boardId = this.boardId;
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
    this.cdr.detectChanges();
  }
}
