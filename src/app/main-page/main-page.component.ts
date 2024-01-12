import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChessBoardView } from 'ngx-chess-board';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  boardSize = 600; 
  lightTileColor = '#EFDAB7';
  darkTileColor = '#B48866'; 
  boardId!: number;
  boardState!: any; 
  board!: NgxChessBoardView;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = +params['id'];
    });
  }

}
