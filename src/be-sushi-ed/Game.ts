import * as _ from 'lodash';

import Grid from "./Grid"
import Coords from './Coords';

export default class Game {
  _grid: Grid;

  constructor() {
    console.log(Grid);
    this._grid = new Grid(5, 8, "smartNormal");
    console.log(this._grid);
  }

  init() {

  }

  draw() {

  }

  Cell(coords: Coords) {
    return this._grid.Cell(coords);
  }


}