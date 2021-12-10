import { ShareDataService } from './../../services/share-data.service';
import { CoinInfo } from './../../models/CoinInfo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() coins: CoinInfo[] = [];

  favorites: CoinInfo[] = [];

  favoriteIds: string[] = [
    "bitcoin", "solana", "chainlink"
  ];

  myCoins: { [key: string]: number } = {
    "bitcoin": 2,
    "solana": 3,
    "chainlink": 5
  }

  constructor(private sharedData: ShareDataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setFavorites();
    console.log("FAVORITES COMPONENT CHANGED");
  }

  setFavorites() {
    this.sharedData.getCoin().subscribe(ids => {
      this.favorites = [];

      if(!ids) {
        return ;
      }

      ids.forEach(id => {
        const coin: CoinInfo =  this.coins.find((coin: CoinInfo) => coin.id === id);
        coin.my_currency = (this.myCoins[coin.id] || 0) * coin.current_price;
        this.favorites.push(coin);
      });

    })
  }
}
