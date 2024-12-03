import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeObserversService {

  constructor() { }

  private searchTermSubject = new BehaviorSubject<string>('');
  
  // Observable that components can subscribe to
  public searchTerm$ = this.searchTermSubject.asObservable();

  // Method to update search term
  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  // Optional method to clear search term
  clearSearchTerm() {
    this.searchTermSubject.next('');
  }
}
