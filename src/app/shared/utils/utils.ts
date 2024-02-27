import * as moment from 'moment';
import { Constants } from './constants';

export class Utils {
  public convertArrayIntoObjForTypeAhead(
    array,
    valueToUseForTypeAhead
  ) {
    let obj: any[] = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      obj.push({
        display: element[valueToUseForTypeAhead],
        value: element,
        template: null // Stubbed for custom typeahead template
      });
    }
    return obj;
  }

  public convertArrayIntoObjForSelect(
    array,
    valueToUseAsKey,
    valueToUseForSelectId,
    valueToUseForSelectLabel
  ) {
    let obj = { selectData: [] as any[] };
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      obj[element[valueToUseAsKey]] = element;
      obj.selectData.push({
        id: element[valueToUseForSelectId],
        label: element[valueToUseForSelectLabel],
      });
    }
    return obj;
  }

  public convertJSDateToNGBDate(jSDate: Date) {
    if (!jSDate) {
      return null;
    }

    return {
      year: jSDate.getFullYear(),
      month: jSDate.getMonth() + 1,
      day: jSDate.getDate(),
    };
  }

  public getFiscalYearFromYYYYMM(date) {
    let year = Number(date.substring(0, 4));
    const month = Number(date.slice(-2));
    if (month > Constants.FiscalYearFinalMonth) {
      year += 1;
    }
    return year;
  }

  public getLatestLockableFiscalYear(dateObj) {
    let year = dateObj.getFullYear() - 1;
    // JS months are 0-indexed.
    let month = dateObj.getMonth() + 1;
    let endYear = this.getFiscalYearFromYYYYMM(`${year}${month}`);
    return new Date(endYear, Constants.FiscalYearFinalMonth, 0, 23, 59, 59, 999);
  }

  public convertJSDateToYYYYMM(date: Date) {
    return moment(date).format('YYYYMM');
  }

  public convertYYYYMMToJSDate(date) {
    return new Date(date.substring(0, 4), date.slice(-2) - 1);
  }

  public convertYYYYMMToMMMMYYYY(date) {
    return moment(new Date(date.substring(0, 4), date.slice(-2) - 1)).format(
      'MMMM YYYY'
    );
  }

  public formatVarianceList(fields) {
    let list = {};
    if (fields?.length) {
      for (const field of fields) {
        list[field.key] = true;
      }
    }
    return list;
  }

}
