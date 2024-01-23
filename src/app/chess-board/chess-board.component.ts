import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, HostListener  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChessBoardView, NgxChessBoardService } from 'ngx-chess-board';
import { ChessBoardEventData } from 'src/models/chessboard-event-data';
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

  @ViewChild('board') board!: NgxChessBoardView;
  @Output() moveMade = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = params['id' ];
    });
    const storedData = localStorage.getItem('StoredGameFen');
    debugger;
    if(storedData){
      const data = JSON.parse(storedData);
      if(this.boardId === '2'){
        this.board.setFEN(data);
        this.flipBoard();
      } else {
        this.board.setFEN(data);
      }
    }
  
  }

  onMoveMade(event: any) {
    if(event && event.fen){
    let eventData: ChessBoardEventData = {
        boardId: this.boardId,
        fen: event.fen
      }
      window.parent.postMessage(eventData, '*');
    } 
  }

  flipBoard() {
    if (this.board) {
      this.board.reverse();
    }
  }

  @HostListener('window:message', ['$event'])
  receiveParentMessage(event: MessageEvent<string>): void {
    if(event.data){
      if(this.boardId === '2'){
        this.board.setFEN(event.data);
        this.flipBoard();
        this.fenString = event.data;
      } else {
      this.board.setFEN(event.data);
      this.fenString = event.data;
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    debugger;
    localStorage.setItem('StoredGameFen', this.fenString);
  }

  ngAfterViewInit(){
    this.cdr.detectChanges();
  }
}
