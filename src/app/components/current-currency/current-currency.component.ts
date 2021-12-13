import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-current-currency',
  templateUrl: './current-currency.component.html',
  styleUrls: ['./current-currency.component.css'],
})
export class CurrentCurrencyComponent implements OnInit {
  constructor(private shareDataService: ShareDataService) {}

  ngOnInit(): void {}

  addMoneyToWallet(el: any) {
    this.shareDataService.addBudget(+el.value);
    el.value = 0;
  }
}
