import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStartDateHigherThanEndDate' })
export class IsStartDateHigherThanEndDate
  implements ValidatorConstraintInterface
{
  validate(value: any, args: any) {
    if (value.getTime() > args.object.endDate.getTime()) return false;
    return true;
  }

  defaultMessage() {
    return `Start date need to be higher than endDate.`;
  }
}
