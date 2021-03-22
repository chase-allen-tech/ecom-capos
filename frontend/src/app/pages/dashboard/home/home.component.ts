import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {UtilService} from '../../../_services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalByMonth: number        = 0;
  totalByDay: number          = 0;
  stockLevels: number         = 0;
  stockOnHand: number         = 0;
  productsByUser:number       = 0;
  productsByCustomer: number  = 0;
  productsByOutlet: number    = 0;
  productsBySupplier: number  = 0;
  registerClosures: number    = 0;
  
  periods = ['Yearly', 'Monthly', 'Daily'];
  salesChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  productChartData: ChartDataSets[] = [
    { data: [34, 33, 85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  public lineChartOptions:ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          id: 'x-axis-0',
          gridLines:{
            color: 'rgba(200,200,200,0.3)'
          },
        }
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(200,200,200,0.3)',
          },
          ticks: {
            stepSize : 20,      // interval value of gridlines of y-axis
          }

        }
      ]
    },
  };
  public salesChartColors: Color[] = [
    {
      borderColor: '#00c5ff',
      backgroundColor: 'rgba(255,255,255,0)',
      pointBackgroundColor: '#00c5ff',
    },
  ];

  public productChartColors: Color[] = [
    {
      borderColor: '#ffc500',
      backgroundColor: 'rgba(255,255,255,0)',
      pointBackgroundColor: '#ffc500',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    this.initHome();
  }

  initHome(): any {
    this.utilService.post('Admin/index', '').subscribe(data => {
      console.log('dashboard data ...', data);
    });
  }
}
