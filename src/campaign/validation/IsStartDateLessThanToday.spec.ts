import { IsStartDateLessThanToday } from './IsStartDateLessThanToday';

describe('IsStartDateLessThanToday', () => {
  let validator: IsStartDateLessThanToday;

  beforeEach(() => {
    validator = new IsStartDateLessThanToday();
  });

  it('should return false if the date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(validator.validate(pastDate)).toBe(false);
  });

  it('should return true if the date is today', () => {
    const today = new Date();
    expect(validator.validate(today)).toBe(true);
  });

  it('should return true if the date is in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(validator.validate(futureDate)).toBe(true);
  });

  it('should return the correct default message', () => {
    expect(validator.defaultMessage()).toBe(
      'Start date need to be higher or equal than today.',
    );
  });
});
