import { ValidationArguments } from 'class-validator';

export class StartsWithLetter {
  validate(text: string, args: ValidationArguments) {
    Number.isNaN(Number(text[0])); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    return 'First symbol of a tag must be a letter';
  }
}
