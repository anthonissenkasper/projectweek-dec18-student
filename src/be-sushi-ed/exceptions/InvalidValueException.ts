export default class InvalidValueException extends Error {
  argument: string;
  value: any;
  condition: string;
  msg: string;

  constructor(argument: string, value: any, condition: string) {
    let msg = `<${argument}> ${condition} | actual: ${value.toString()}`;
    super(msg);
    console.error(value);

    this.argument = argument;
    this.value = value;
    this.condition = condition;
    this.msg = msg;

    this.name = 'InvalidValueException';
  }
}