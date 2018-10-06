import { Injectable } from '@angular/core';

@Injectable()
export class ScrubberService {

  constructor() { }

  /**
   * Return a string to used as a single query param that consists of letters.
   * If optional config item is supplied, will allow that character to pass the
   * allocated amount of times indicated.
   * @param value String to be scrubbed
   * @param config Optional config item to add exceptions to the letters only rule
   */
  scrubString(value:string, config?: ScrubberConfig): string {
    //object to count the config items occurence
    let countObj = {};
    if(config) {
      config.exceptions.forEach(value => {
        if(value.character) {
          countObj[value.character] = {}
          countObj[value.character].limit = (value.amount) ? value.amount :1 ;
          countObj[value.character].actual = 0;
        }
      });
    }
    return value.toLowerCase().split('').map(val => {
      if(val.match(/^[a-z]/)) {
        return val;
      } else if(config) {
        const found = config.exceptions.find(val2 => val2.character === val);
        if(found && countObj[val].actual < countObj[val].limit) {
          countObj[val].actual++;
          return val;
        }
      }

    }).join('');
  }

}

export interface ScrubberConfig {
  exceptions: ScrubberConfigItem[]
}

export interface ScrubberConfigItem {
  character: string,
  amount: number
}
