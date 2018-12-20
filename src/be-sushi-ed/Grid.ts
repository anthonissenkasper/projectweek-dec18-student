import Cell from "./Cell";
import { Coords, C } from "./Coords";
import { Check } from "./util/Check";
import {range} from "lodash";
import InvalidValueException from "./exceptions/InvalidValueException";

type Generator = (coords: Coords, grid: Grid, generatorPrefs?: GeneratorPrefs) => Cell;
type Orientation = 0 | 1 | 2 | 3;
type GeneratorPrefs = {
  fillCell?: Cell;
  possibleMovesTargetDelta?: number;
};

export class Generators {
  static solid: Generator = function(_, __, generatorPrefs?: GeneratorPrefs) {
    if (generatorPrefs !== undefined && generatorPrefs.fillCell)
      return generatorPrefs.fillCell
    else
      return new Cell("normal", 0);
  };
  static random: Generator = function() {
    return new Cell("normal", Math.floor(Math.random() * (Cell.maxColor + 1)));
  };
  static smart: Generator = function(coords: Coords, grid: Grid, generatorPrefs: GeneratorPrefs = {possibleMovesTargetDelta: -5}) {
    let potential: Cell;
    let legalCells: Array<Cell> = [];

    for (let color = 0; color < Cell.maxColor; color++) {
      potential = new Cell("normal", color);
      if (grid.totalScore(coords, potential) <= 0)
        legalCells.push(potential);
    }

    if (legalCells.length <= 1)
      throw new Error("there must be at least one legal color");
    
    // Choose color to match target possible moves
    // calc n/o possible moves
    let noPossibleMoves = legalCells.map((cell) => grid.getPossibleMoveOrientations(coords, cell).length);
    let bestOp: (...values: number[]) => number;

    if (generatorPrefs.possibleMovesTargetDelta === undefined || generatorPrefs.possibleMovesTargetDelta > 0) {
      bestOp = Math.max;
    } else {
      bestOp = Math.min;
    }
    let bestLegalCellsIndex = noPossibleMoves.indexOf(bestOp(...noPossibleMoves));

    return legalCells[bestLegalCellsIndex];
  }
}

export default class Grid {
  _w: number; _h: number;
  _cells: Array<Array<Cell>>

  constructor(w: number, h: number, generator: Generator = Generators.solid, generatorPrefs?: GeneratorPrefs) {
    this._w = w;
    this._h = h;
    this._cells = new Array(h);
    for (let y = 0; y < h; y++) {
      this._cells[y] = new Array(w).fill(null);
    }
    this.generate(generator, generatorPrefs);
  }

  get w() {
    return this._w;
  }

  get h() {
    return this._h;
  }

  generate(generator: Generator, generatorPrefs: GeneratorPrefs = {fillCell: new Cell("normal", 0), possibleMovesTargetDelta: 0}) {
    let movesTarget = 0;
    let currentNoMoves = 0;
    for (let y = 0; y < this.h; y++) {
      let row = this._cells[y];
      for (let x = 0; x < this.w; x++) {
        generatorPrefs.possibleMovesTargetDelta = movesTarget - currentNoMoves;
        let coords = C(x, y)
        let cell = generator(coords, this, generatorPrefs);
        row[x] = cell;
        currentNoMoves += this.getPossibleMoveOrientations(coords, cell).length;
      }
    }
  }

  horizontalGroupSize(coords: Coords, cell: Cell | null = this.rawCell(coords)) {
    return this.groupSizeByOrientation(coords, 0, cell) + 1 + this.groupSizeByOrientation(coords, 2, cell);
  }

  verticalGroupSize(coords: Coords, cell: Cell | null = this.rawCell(coords)) {
    return this.groupSizeByOrientation(coords, 1, cell) + 1 + this.groupSizeByOrientation(coords, 3, cell);
  }

  totalScore(coords: Coords, cell: Cell | null = this.rawCell(coords)) {
    let score = 0;
    let hScore = this.horizontalGroupSize(coords, cell) - 2;
    let vScore = this.verticalGroupSize(coords, cell) - 2;
    score += hScore > 0 ? hScore : 0;
    score += vScore > 0 ? vScore : 0;
    return score;
  }

  isLegalMove(coords: Coords, orienation: Orientation, cell: Cell | null = this.rawCell(coords)) {
    return (this.totalScore(coords.neighbour(orienation), cell) > 0);
  }

  // Returns the orientations for which a move is possible
  getPossibleMoveOrientations(coords: Coords, cell: Cell | null = this.rawCell(coords)) {
    const orientations: Array<Orientation> = [0, 1, 2, 3];
    let possibleMoves = [];
    for (let orienation of orientations) {
      if (this.isLegalMove(coords, orienation, cell)) 
        possibleMoves.push(orienation);
    }
    return possibleMoves;
  }

  groupSizeByOrientation(coords: Coords, orienation: Orientation, cell: Cell | null = this.Cell(coords)) {
    let score = 0;
    let toCheckCoords = coords.neighbour(orienation);
    let toCheck = this.rawCell(toCheckCoords);

    while (toCheck !== null && cell !== null && cell.equals(toCheck)) {
      toCheckCoords = toCheckCoords.neighbour(orienation);
      toCheck = this.rawCell(toCheckCoords);

      score++;
    }

    return score;
  }

  isValidCoords(coords: Coords) {
    if (!(coords.x >= 0)) return "x coord must be greater or equal to 0";
    if (!(coords.x < this._w)) return "x coord must be smaller than the grid's width <this.w>";
    if (!(coords.y >= 0)) return "y coord must be greater or equal to 0";
    if (!(coords.y < this._h)) return "y coord must be smaller than the grid's height <this.h>";
    return null;
  }

  Cell(coords: Coords) {
    Check<Coords>("coords", coords, coords => this.isValidCoords(coords));
    return this._cells[coords.y][coords.x];
  }

  /**
   * @raw
   */
  rawCell(coords: Coords) {
    if (this._cells === undefined)
      return null;
    if (this._cells[coords.y] === undefined)
      return null;
    else
      return this._cells[coords.y][coords.x] || null;
  }

  setCell(coords: Coords, cell: Cell): void {
    Check<Coords>("coords", coords, coords => this.isValidCoords(coords));
    this._cells[coords.y][coords.x] = cell;
  }

  randomCoords() {
    let x = Math.floor(Math.random() * this.w);
    let y = Math.floor(Math.random() * this.h);
    return C(x, y);
  }

  swap(coords: Coords, orienation: Orientation) {
    if (this.isLegalMove(coords, orienation)) {
      console.log("legal");
    }
  }

  gridAsString() {
    let str = '';
    for (const coll of this._cells) {
      for (const cell of coll) {
        str += cell.color;
        str += ' ';
      }
      str += '\n';
    }
    return str;
  }
}