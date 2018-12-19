import * as _ from 'lodash';
import * as PIXI from 'pixi.js'

import Grid from "./Grid"

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


}