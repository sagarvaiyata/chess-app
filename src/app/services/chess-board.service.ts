import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChessService {
    private chessBoardState = new BehaviorSubject<any>('');
    currentBoardState = this.chessBoardState.asObservable();

    constructor() { }
    updateBoardState(newState: any) {
        this.chessBoardState.next(newState);
    }
}
