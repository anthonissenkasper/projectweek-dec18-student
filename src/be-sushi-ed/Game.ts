import * as _ from 'lodash';

import Grid, { Generators } from "./Grid"
import { Coords } from './Coords';

const CELL_ICON_PATHS = [
  ""
]

export default class Game {
  _grid: Grid;

  constructor() {
    this._grid = new Grid(5, 8, Generators.smart);
  }

  get h() {
    return this._grid.h
  }

  get w() {
    return this._grid.w
  }

  Cell(coords: Coords) {
    return this._grid.Cell(coords);
  }
}