import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChessBoardView } from 'ngx-chess-board';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @ViewChild('iframe1') iframe1!: ElementRef<HTMLIFrameElement>;
  @ViewChild('iframe2') iframe2!: ElementRef<HTMLIFrameElement>;
  @Output() moveMade = new EventEmitter<string>();
  onMove(fen: string, origin: 'iframe1' | 'iframe2'): void {
    const targetIframe = origin === 'iframe1' ? this.iframe2 : this.iframe1;
    
    console.log(targetIframe);
    targetIframe.nativeElement.contentWindow?.postMessage({ fen: fen }, '*');
  }
  onChessBoardMove(fen: Event) {
    console.log(fen);
  }
}
