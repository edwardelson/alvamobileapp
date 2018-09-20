import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationProvider } from '../auth/auth';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';

import { EnergyGenerated } from '../../interfaces/interface.userData'

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private userName: Subject<string> = new Subject<string>();
  // need to assign a class to this object
  private userData: Subject<any> = new Subject<any>();

  userId: string = "92dJ3tQUotM5l5mVgb2ODzxsHup2";
  siteId: string = "site01";
  date: string;

  dailyEnergy: EnergyGenerated = {
    year: "2018",
    month: "09",
    day: "01",
    energy_wh: 50000
  }

  constructor(
    private auth: AuthenticationProvider,
    private af: AngularFireDatabase
  ) {

      // ### TEMPORARY ###
      //this.updateUserData();

      this.auth.afAuth.authState.subscribe(user => {
        if(user) {

          // update userId
          this.userId = user.uid;

          // notify subscriber that this value has been updated
          this.userName.next(user.displayName)

          // update dateNow
          this.date = this.getDateNow()

          // update user data
          this.updateUserData();

          console.log(user.uid, user.displayName, user.email);
      }})
   }

  // return (year, month)
  getDateNow(){
    var today = new Date();
    var yy = today.getFullYear();
    var mm = today.getMonth() + 1;

    // append zero in front
    var mmStr = (mm < 10) ? '0' + String(mm) : String(mm);

    // ### TEMPORARY ###
//    return yy + "/" + mmStr;
    return "1970/01";
  }

   // return user name
  getUserName(){
    return this.userName;
  }

  // update userData after firebase query
  // query from userData with date
  updateUserData() {

    // energyGenerated url
    let url = 'userData/' + this.userId + "/" + this.siteId + "/" +
      "energyGenerated/" + this.date

    this.af.list(url)
      .snapshotChanges()
      .subscribe(items => {

        // parse into array
        let energyDataArray = items.map(item => {
          return new EnergyGenerated("1970", "01", item.key, item.payload.val().energy_wh);
        })

        // update user data, notify subscriber
        this.userData.next(energyDataArray);
      });

  }

  // return userData subject, notify subscriber if data is changed
  getEnergyData() {
    return this.userData;
  }


}
