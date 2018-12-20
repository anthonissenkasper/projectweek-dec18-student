import { Check } from "./util/Check";

type Type = "normal" | "star" | "flaming";
type Color = number; // Whole, between 0 and 6 inclusive

/**
 * @immutable
 */
export default class Cell {
  _type: Type;
  _color: Color;

  constructor(type: Type, color: Color) {
    Check<Color>("color", color, Cell.isValidColor);

    this._type = type;
    this._color = color;
  }

  static get maxColor() {
    return 6;
  }

  static isValidColor(color: Color) : string|null {
    if (!Number.isInteger(color)) return "must be an integer";
    if (!(color >= 0 && color <= Cell.maxColor)) return "must lie between 0 and Cell.maxColor inclusive"
    return null;
  }

  get type() {
    return this._type;
  }

  get color() {
    return this._color
  }

  equals(other: Cell) {
    return this.type === other.type && this.color === other.color;
  }
}
