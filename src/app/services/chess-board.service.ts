import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChessGameService {
    // Using a BehaviorSubject to maintain the latest state of each board.
    private boardUpdates = new BehaviorSubject<Map<string, string>>(new Map());

    constructor() {}

// Method to receive updates from the board components
updateBoard(update: ChessBoardUpdate): void {
    const updates = this.boardUpdates.getValue();
    updates.set(update.boardId, update.fen);
    console.log(updates)
    this.boardUpdates.next(updates);
}

// Observable to subscribe to for updates
getBoardUpdates(): Observable<Map<string, string>> {
    return this.boardUpdates.asObservable();
}

// Optionally, a method to get the FEN of a specific board
getFenForBoard(boardId: string): string | undefined {
    return this.boardUpdates.getValue().get(boardId);
}
}

export interface ChessBoardUpdate{
    boardId: string;
    fen: string;
}