import { Check } from "./util/Check";

export default class Coords {
  _x: number; _y: number;

  constructor(x: number, y: number) {
    Check<number>("x", x, Coords.isValidCoord);
    Check<number>("y", y, Coords.isValidCoord);

    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  static isValidCoord(coord: number) {
    return coord >= 0 ? null : "must be greater or equal to zero";
  }
}