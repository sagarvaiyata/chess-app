import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChessBoardView, NgxChessBoardService, NgxChessBoardModule } from 'ngx-chess-board';

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

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = +params['id' ];
      this.boardState = {};
      window.addEventListener('message', this.receiveMessage.bind(this), false);  
    });
  }

  flipBoard() {
    if (this.board) {
      this.board.reverse();
    }
  }

  receiveMessage(event: MessageEvent) {
    if (event.data && event.data.fen && event.data.targetBoardId === this.boardId) {
      this.board.setFEN(event.data.fen); 
    }
  }

  ngAfterViewInit(){
    this.lastFen = this.board.getFEN();
    window.addEventListener('message', (event) => {
      if (event.data && event.data.fen && event.data.targetBoardId === this.boardId) {
        this.board.setFEN(event.data.fen);
      }
    }, false);
    if (this.boardId === 2) {
      this.flipBoard(); 
    }
  }

  onPlayerMove() {
    const currentFen = this.board.getFEN();
    this.board.setFEN(currentFen);
    if (currentFen !== this.lastFen) {
      window.parent.postMessage({ boardId: this.boardId, fen: currentFen }, '*');
      this.lastFen = currentFen;
    }
    this.board.setFEN(currentFen);
    if (this.boardId === 2) {
      this.flipBoard(); 
    }
  }

}
