import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ChessBoardEventData } from 'src/models/chessboard-event-data';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit{

  @ViewChild('frame1') iframe1!: ElementRef;
  @ViewChild('frame2') iframe2!: ElementRef;


  ngAfterViewInit() {
   
  }

  @HostListener('window:message', ['$event'])
  receiveMessage(event: MessageEvent<ChessBoardEventData>): void{
    if(event.data.boardId === '1') {
      this.iframe2.nativeElement.contentWindow?.postMessage(event.data.fen);
    } else if(event.data.boardId === '2') {
      this.iframe1.nativeElement.contentWindow?.postMessage(event.data.fen);
    }
  }
}
