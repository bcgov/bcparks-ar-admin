export class VarianceUtils {
  static calculateVariance(
    firstYearValue = null,
    secondYearValue = null,
    thirdYearValue = null,
    currentValue,
    variancePercentage
  ) {
    let numberOfYearsProvided = 0;
    numberOfYearsProvided += firstYearValue ? 1 : 0;
    numberOfYearsProvided += secondYearValue ? 1 : 0;
    numberOfYearsProvided += thirdYearValue ? 1 : 0;

    const averageHistoricValue =
      ((firstYearValue ? firstYearValue : 0) +
        (secondYearValue ? secondYearValue : 0) +
        (thirdYearValue ? thirdYearValue : 0)) /
      numberOfYearsProvided;

    const percentageChange =
      (currentValue - averageHistoricValue) / averageHistoricValue;
    const percentageChangeAbs = Math.abs(percentageChange);

    let varianceErrorMessage = `Variance triggered: ${
      percentageChangeAbs >= 0 ? '+' : '-'
    }${String(percentageChangeAbs * 100)}%`;

    let varianceTriggered =
      variancePercentage - percentageChangeAbs < 0 ? true : false;

    return {
      varianceErrorMessage: varianceErrorMessage,
      varianceTriggered: varianceTriggered,
      percentageChange: percentageChange,
    };
  }
}
