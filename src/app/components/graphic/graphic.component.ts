import { ChartData } from './../../models/ChartData';
import { ShareDataService } from 'src/app/services/share-data.service';
import { CoinsService } from './../../services/coins.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicComponent implements OnInit {

  public hours: string[] = [];
  public coinSelected:boolean = false;
  public coinSelectedValue:string;
  public coinValues: number[] = [];
  public updateOptions: any;
  public chartType:string="Bar Chart"; 

  public options: any = this.UpdateChartType('bar');

  private UpdateChartType(chartType:string):any{
    return{
      legend: {
        data: [chartType],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.hours,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: chartType,
          type: chartType,
          data: this.coinValues,
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  
  }
  constructor(
    private sharedData: ShareDataService,
    private coinService: CoinsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedData
      .getSelectedCoin()
      .pipe(
        tap(coinId=>{
          this.coinSelected=true;
          this.coinSelectedValue=coinId;
        }),
        switchMap(coinId => {
        return this.coinService.getHistoryDataForCoin(coinId)
      })).subscribe((chartData: ChartData) => {
          this.formatChartData(chartData);
          this.updateOptions = {
            xAxis: {
              data: this.hours
            },
            yAxis: {
              scale: true
            },
            series: [{
              data: this.coinValues
            }]
          };
      });
  }

  private formatChartData(chartData: ChartData) {
    this.hours = [];
    this.coinValues = [];

    for(let i=0; i<chartData.prices.length;i++) {
      const price = chartData.prices[i];
      const priceTime =  new Date(price[0]);
      const value = price[1].toFixed(2);

      this.hours.push(priceTime.toLocaleString());
      this.coinValues.push(+value);
    }

    this.cdr.markForCheck();
  }
  onChangeEvent(ev:MatSlideToggleChange ):void{
 
    if(ev.checked){
      this.chartType="Line Chart";
      this.updateOptions=  this.UpdateChartType("line"); 
    }else{
     this.chartType="Bar Chart";
     this.updateOptions=  this.UpdateChartType("bar");
   } 
  }
  
  
}
