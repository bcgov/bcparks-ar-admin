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
}
