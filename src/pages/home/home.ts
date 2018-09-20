import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AuthenticationProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  userName: string;
  userEnergyDataArray: any;

  constructor(
    public navCtrl: NavController,
    private db: DatabaseProvider
  ) {

    let today = new Date();
    console.log(today.getFullYear());


    // update userName when loading
    this.db.getUserName()
      .subscribe(value => {
        this.userName = value
      })
  }


  ionViewDidLoad() {

    // get data
    this.db.getEnergyData()
    .subscribe(items => {
      this.userEnergyDataArray = items;

      // print data in energy array
      this.userEnergyDataArray.map(eg => {
        console.log(eg.year, eg.month, eg.day, eg.energy_wh)
      })

    });


    // load chart
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
          ]
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
