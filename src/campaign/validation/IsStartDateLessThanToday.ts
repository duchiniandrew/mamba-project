import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStartDateLessThanToday' })
export class IsStartDateLessThanToday implements ValidatorConstraintInterface {
  validate(value: any) {
    if (value.getTime() < new Date().getTime()) return false;
    return true;
  }

  defaultMessage() {
    return `Start date need to be higher or equal than today.`;
  }
}
