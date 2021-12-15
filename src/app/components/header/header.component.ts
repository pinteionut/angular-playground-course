import { CoinInfo } from './../../models/CoinInfo';
import { Component, Input, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() coins: CoinInfo[] = [];
  showCurrency:boolean;

  constructor(private sharedDataService:ShareDataService) { }

  ngOnInit(): void {
    this.sharedDataService.showHeaderBudgetAdd.subscribe(s=>
        this.showCurrency=s
    )
  }

}
