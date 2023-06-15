import { VarianceUtils } from './variance-utils';

fdescribe('Variance Util Tests', () => {
  it('should trigger variance', async () => {
    const value = VarianceUtils.calculateVariance(8, 8, 8, 10, 0.2);
    expect(value).toEqual({
      varianceErrorMessage: 'Variance triggered: +25%',
      varianceTriggered: true,
      percentageChange: 0.25,
    });
  });

  it('should not trigger variance', async () => {
    const value = VarianceUtils.calculateVariance(10, 10, 10, 10, 0.2);
    expect(value).toEqual({
      varianceErrorMessage: 'Variance triggered: +0%',
      varianceTriggered: false,
      percentageChange: 0,
    });
  });

  it('should calulate variance with two years', async () => {
    const value = VarianceUtils.calculateVariance(8, 8, null, 10, 0.2);
    expect(value).toEqual({
      varianceErrorMessage: 'Variance triggered: +25%',
      varianceTriggered: true,
      percentageChange: 0.25,
    });
  });
});
