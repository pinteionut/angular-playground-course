import { CoinInfo } from './../models/CoinInfo';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public coin$ = new BehaviorSubject<string[]>(undefined);

  public selectedCoin$ = new Subject<string>();

  constructor() { }

  public getCoin(): Observable<string[]> {
    return this.coin$.asObservable();
  }

  public getSelectedCoin(): Observable<string> {
    return this.selectedCoin$.asObservable();
  }
}
