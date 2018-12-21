import Cell from "./Cell";
import { Coords, C } from "./Coords";
import { Check } from "./util/Check";
import {range, cloneDeep} from "lodash";
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

    let targetMoves = generatorPrefs.possibleMovesTargetDelta === undefined ? 0 : generatorPrefs.possibleMovesTargetDelta;
    let preferredNoPossibleMoves = (targetMoves >= 0) ? Math.max(...noPossibleMoves) : Math.min(...noPossibleMoves);
    let preferredCells: Array<Cell> = [];
    for (let i = 0; i < legalCells.length; i++) {
      if (noPossibleMoves[i] === preferredNoPossibleMoves)
        preferredCells.push(legalCells[i]);
    }

    let randomIndex = Math.floor(Math.random() * preferredCells.length);
    return preferredCells[randomIndex];
  }
}

export default class Grid {
  _w: number; _h: number;
  _cells: Array<Array<Cell | null>>

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
    let movesTarget = 20;
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

  horizontalGroup(coords: Coords, cell: Cell | null = this.rawCell(coords)) {
    let group: Array<Coords> = new Array();
    group.push(...this.groupByOrientation(coords, 0, cell));
    group.push(coords);
    group.push(...this.groupByOrientation(coords, 2, cell))
    return group;
  }

  verticalGroup(coords: Coords, cell: Cell | null = this.rawCell(coords)) {
    let group: Array<Coords> = new Array();
    group.push(...this.groupByOrientation(coords, 1, cell));
    group.push(coords);
    group.push(...this.groupByOrientation(coords, 3, cell))
    return group;
  }

  totalScore(coords: Coords, cell: Cell | null = this.rawCell(coords)) {
    let score = 0;
    let hScore = this.horizontalGroup(coords, cell).length - 2;
    let vScore = this.verticalGroup(coords, cell).length - 2;
    score += hScore > 0 ? hScore : 0;
    score += vScore > 0 ? vScore : 0;
    return score;
  }

  isLegalMove(coords: Coords, orienation: Orientation, cell: Cell | null = this.rawCell(coords)) {
    let neighbour = coords.neighbour(orienation);
    return (this.totalScore(neighbour, cell) > 0);
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

  groupByOrientation(coords: Coords, orienation: Orientation, cell: Cell | null = this.Cell(coords)) {
    let toCheckCoords = coords.neighbour(orienation);
    let toCheck = this.rawCell(toCheckCoords);
    let group: Array<Coords> = new Array();

    while (toCheck !== null && cell !== null && cell.equals(toCheck)) {
      group.push(toCheckCoords);

      toCheckCoords = toCheckCoords.neighbour(orienation);
      toCheck = this.rawCell(toCheckCoords);
    }

    return group;
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

  setCell(coords: Coords, cell: Cell | null): void {
    Check<Coords>("coords", coords, coords => this.isValidCoords(coords));
    this._cells[coords.y][coords.x] = cell;
  }

  randomCoords() {
    let x = Math.floor(Math.random() * this.w);
    let y = Math.floor(Math.random() * this.h);
    return C(x, y);
  }

  swap(coords: Coords, orienation: Orientation) {
    let coordsA = coords;
    let coordsB = coords.neighbour(orienation);
    let a = this.Cell(coordsA);
    let b = this.Cell(coordsB);
    this.setCell(coordsA, b);
    this.setCell(coordsB, a);
  }

  gridAsString() {
    let str = '';
    for (const coll of this._cells) {
      for (const cell of coll) {
        str += cell === null ? ' ' : cell.color;
        str += ' ';
      }
      str += '\n';
    }
    return str;
  }

  clone() {
    return cloneDeep(this);
  }
}