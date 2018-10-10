export interface ForecastData {
    pressure: number,
    days: [{
      date: string,
      high: number,
      low: number
    }]
};