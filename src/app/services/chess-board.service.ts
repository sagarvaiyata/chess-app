import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChessGameService {
    private currentFen = new BehaviorSubject<string>('start_position_fen');

    // Observable stream for components to subscribe to
    currentFen$ = this.currentFen.asObservable();
    constructor() {}
// Method to update the FEN and notify all subscribers
    updateFen(newFen: string) {
        this.currentFen.next(newFen);
    }
}