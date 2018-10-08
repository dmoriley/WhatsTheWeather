import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'temperature'
})
/**
 * Pipe used to convert from Kelvin to either Celsius, Fahrenheit or Kelvin with the option of displaying
 * their corresponding symbol.
 */
export class TemperaturePipe implements PipeTransform {
    transform(value: number, format: string = "c", symbol: boolean = false) {
        if(!value) return null;
        let converted: string;
        format = format.trim().toLowerCase();
        //using toFixed for rounding can present incorrect values when going larger than 2 decimal places and would have to be
        //changed if the percision needed to be increased.
        if(format === 'f') {
            converted = ""+((value - 273.15) * 9/5 + 32).toFixed(2) 
            + (symbol ? " \u2109" : "");
        } else if(format === 'k') {
            converted = ""+ value.toFixed(2) 
            + (symbol ? " K" : "");
        } else { //default celcius
            converted = ""+(value - 273.15).toFixed(2)
                // + (symbol ? "&#8451;" : "");
                + (symbol ? " \u2103" : "");
        }

        return converted;

    }
}