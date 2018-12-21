import { Check } from "./util/Check";
import { invNZ, TAU } from "./util/Math";

export type Orientation = 0 | 1 | 2 | 3;
const orientations: Array<Orientation> = [0, 1, 2, 3];
type Nn = {
  orientation: Orientation,
  coords: Coords
}

export class Coords {
  _x: number; _y: number;

  constructor(x: number = 0, y: number = 0) {
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

  movedBy(delta: Coords) {
    return new Coords(this.x + delta.x, this.y + delta.y);
  }

  neighbour(orientation: Orientation) {
    let x = invNZ(Math.round(Math.cos((TAU / 4) * (orientation % 4))));
    let y = invNZ(Math.round(Math.sin((TAU / 4) * (orientation % 4))));
    return this.movedBy(new Coords(x, y));
  }

  orientationByNeighbour(neighbour: Coords) {
    for (const orientation of orientations) {
      let toTest = this.neighbour(orientation)
      if (toTest.equals(neighbour))
        return orientation;
    }
    return null;
  }

  // // list of all the neighbour's neighbours
  // nns() {
  //   const nnsDeltas = [C(2, 0), C(1, 1), C(0, 2), C(-1, 1), C(-2, 0), C(-1, -1), C(0, -2), C(1, -1)];
  //   let nns = new Array<Nn>(nnsDeltas.length);
  //   for (let i = 0; i < nnsDeltas.length; i++) {
  //     const nnsDelta = nnsDeltas[i];
  //     let nns: Nn = {
  //       orientation: Math.floor(8/4),

  //     }
  //     nns[i] = this.movedBy(nnsDelta);
  //   }
  //   return nns;
  // }

  static isValidCoord(coord: number) {
    return Number.isInteger(coord) ? null : "must be an integer";
  }

  toString() {
    return `Coords [x: ${this.x}, y: ${this.y}]`
  }

  equals(other: Coords) {
    return (this.x === other.x && this.y === other.y);
  }
}

export function C(x: number, y: number) {
  return new Coords(x, y);
}