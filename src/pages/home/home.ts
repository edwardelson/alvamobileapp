import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["11", "12", "13"],
        datasets: [{
          label: 'kWh',
          data: [12, 19, 15],
          backgroundColor: [
              'rgb(0, 168, 107)',
              'rgb(0, 168, 107)',
              'rgb(0, 168, 107)',
          ],
          //borderColor: [
          //     'rgb(104, 159,56)',
          //     'rgb(104, 159,56)',
          //     'rgb(104, 159,56)',
          //     'rgb(104, 159,56)',
          //     'rgb(104, 159,56)',
          //     'rgb(104, 159,56)'
          // ],
          //borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

}
