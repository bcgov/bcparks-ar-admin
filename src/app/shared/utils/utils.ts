import * as moment from 'moment';
import { Constants } from './constants';

export class Utils {
  public convertArrayIntoObjForTypeAhead(
    array,
    valueToUseAsKey,
    valueToUseForTypeAhead
  ) {
    let obj = { typeAheadData: [] as any[] };
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      obj[element[valueToUseAsKey]] = element;
      obj.typeAheadData.push(element[valueToUseForTypeAhead]);
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
}
