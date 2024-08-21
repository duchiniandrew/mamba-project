import { IsStartDateHigherThanEndDate } from './IsStartDateHigherThanEndDate';

describe('IsStartDateHigherThanEndDate', () => {
  let validator: IsStartDateHigherThanEndDate;

  beforeEach(() => {
    validator = new IsStartDateHigherThanEndDate();
  });

  it('should return false if the start date is higher than the end date', () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);

    const args = { object: { endDate } };

    expect(validator.validate(startDate, args)).toBe(false);
  });

  it('should return true if the start date is less than or equal to the end date', () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    const args = { object: { endDate } };

    expect(validator.validate(startDate, args)).toBe(true);
  });

  it('should return true if the start date is equal to the end date', () => {
    const startDate = new Date();
    const endDate = new Date();

    const args = { object: { endDate } };

    expect(validator.validate(startDate, args)).toBe(true);
  });

  it('should return the correct default message', () => {
    expect(validator.defaultMessage()).toBe(
      'Start date need to be higher than endDate.',
    );
  });
});
