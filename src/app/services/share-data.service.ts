import { CoinInfo } from './../models/CoinInfo';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  public coin$ = new BehaviorSubject<string[]>(undefined);

  public selectedCoin$ = new Subject<string>();
  private storageBudget = +localStorage.getItem('budget');
  private budget$ = new BehaviorSubject<number>(this.storageBudget);

  constructor() {}

  public getCoin(): Observable<string[]> {
    return this.coin$.asObservable();
  }

  public getSelectedCoin(): Observable<string> {
    return this.selectedCoin$.asObservable();
  }

  public addBudget(value: number) {
    const currentBudget = (this.storageBudget += value);
    this.storageBudget = currentBudget;
    localStorage.setItem('budget', currentBudget.toString());
    this.budget$.next(currentBudget);
  }

  public getBudget(): Observable<number> {
    return this.budget$.asObservable();
  }
}
