import { Utils } from './utils';

describe('Utils Testing', async () => {
  it('Should convert JS Date to NGBDate', async () => {
    let utils = new Utils();
    let typeAheadObj = utils.convertArrayIntoObjForTypeAhead([{'key':'value'}], 'key', 'typeahead');
    expect(typeAheadObj.typeAheadData.length).toEqual(1);
    let selectObj = utils.convertArrayIntoObjForSelect([{'key':{'selectId': 'someId', 'selectLabel': 'someLabel'}}], 'key', 'selectId', 'selectLabel');
    expect(selectObj.selectData.length).toEqual(1);

    // Coerce to be null
    let nullValue:any = new Date;
    nullValue = null;
    let NGBDateNull = utils.convertJSDateToNGBDate(nullValue);
    expect(NGBDateNull).toBe(null);

    let dt = new Date();
    dt.setDate(31);
    dt.setMonth(11);
    dt.setFullYear(2014);
    let NGBDate = utils.convertJSDateToNGBDate(dt);
    expect(NGBDate).toEqual({"year":2014,"month":12,"day":31});
    let YYYYMM = utils.convertJSDateToYYYYMM(dt);
    expect(YYYYMM).toBe('201412');
    let fy = utils.getFiscalYearFromYYYYMM(YYYYMM);
    expect(fy).toBe(2015);
    let llfy = utils.getLatestLockableFiscalYear(dt);
    expect(llfy).toEqual(new Date(2014, 3, 0, 23, 59, 59, 999));
    let aJSDate = utils.convertYYYYMMToJSDate(YYYYMM);
    expect(aJSDate).toEqual(new Date(2014, 11));
    let mmmmyyyy = utils.convertYYYYMMToMMMMYYYY(YYYYMM);
    expect(mmmmyyyy).toEqual('December 2014');
  })
});