//export interface EnergyGenerated {
//  year: string;
//  month: string;
//  day: string;
//  energy_wh: number;
//}

export class EnergyGenerated {
  public year: string;
  public month: string;
  public day: string;
  public energy_wh: number;

  constructor(
    year: string,
    month: string,
    day: string,
    energy_wh: number
  ) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.energy_wh = energy_wh;
  }
}
