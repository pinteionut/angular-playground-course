import { fromEvent, interval, switchMap, take } from 'rxjs';
import { CoinInfo } from './models/CoinInfo';
import { Component } from '@angular/core';
import { CoinsService } from './services/coins.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Virtual Wallet';
  coins: CoinInfo[] = [];

  constructor(private coinsService: CoinsService) {
  }

  ngOnInit(): void {
    this.getCoinsData();
    window.setInterval(this.getCoinsData.bind(this), 20000);
    console.log("APP COMPONENT INITIALIZED");
  }

  getCoinsData() {
    this.coinsService.getCoins().subscribe((response) => {
      this.coins = response;
    })
  }
}
