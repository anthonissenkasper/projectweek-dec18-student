import * as _ from 'lodash';

import Grid, { Generators } from "./Grid"
import { Coords, Orientation } from './Coords';

export default class Game {
  _grid: Grid;

  constructor() {
    this._grid = new Grid(5, 5, Generators.smart);
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

  removeCells(...coords: Array<Coords>) {
    for (let coord of coords) {
      this._grid.setCell(coord, null);
    }
  }

  gravity(newUpdatedCoords: Array<Coords>) {
    for (const newUpdatedCoord of newUpdatedCoords) {
      // Move upper neighbour down all the way
      let currentCoord = newUpdatedCoord.neighbour(3);
      let currentCell = this._grid.rawCell(currentCoord);
      let downCoord = newUpdatedCoord;
      let downCell = this._grid.rawCell(downCoord);
      while (downCell === null) {
        try {
          this._grid.setCell(downCoord, currentCell);
        } catch {
          break;
        }
        this._grid.setCell(currentCoord, null);
        currentCoord = downCoord;
        currentCell = this._grid.rawCell(currentCoord);
        downCoord = currentCoord.neighbour(1);
      }
      // if (upperNeighbour !== null) {

      // }
      // currentCoord = upperNeighbour;
      // currentCell = this._grid.rawCell(currentCoord);
      // upperNeighbourCoord = currentCoord.neighbour(3);
      // upperNeighbour = this._grid.rawCell(currentCoord);

    }
  }

  swapByCoords(coordsA: Coords, coordsB: Coords, everyChangeCallback?: (changed: Array<Coords>, grid: Grid) => void) {
    let orientation = coordsA.orientationByNeighbour(coordsB);

    if (orientation === null)
      return false;

    if (this.swap(coordsA, orientation)) {
      let updatedCoords: Array<Coords> = [coordsA, coordsB]; // Only handle stuff for these
      // Legal swap
      for (let i = 0; i < updatedCoords.length; i++) {
        const updatedCoord = updatedCoords[i];
        let updatedCell = this._grid.Cell(updatedCoord);
        let newUpdatedCoords: Array<Coords> = [];

        let hGroup = this._grid.horizontalGroup(updatedCoord, updatedCell);
        if (hGroup.length >= 3) {
          this.removeCells(...hGroup);
          newUpdatedCoords.push(...hGroup);
        }

        let vGroup = this._grid.verticalGroup(updatedCoord, updatedCell);
        if (vGroup.length >= 3) {
          this.removeCells(...vGroup);
          newUpdatedCoords.push(...vGroup);
        }

        if (newUpdatedCoords.length !== 0) {
          if (everyChangeCallback !== undefined) {
            everyChangeCallback(newUpdatedCoords, this._grid.clone())
          }
          this.gravity(newUpdatedCoords);
          if (everyChangeCallback !== undefined) {
            everyChangeCallback(newUpdatedCoords, this._grid.clone())
          }

          updatedCoords.push(...newUpdatedCoords);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  swap(coords: Coords, orientaion: Orientation) {
    if (this._grid.isLegalMove(coords, orientaion)) {
      this._grid.swap(coords, orientaion);
      return true;
    } else {
      return false;
    }
  }
}