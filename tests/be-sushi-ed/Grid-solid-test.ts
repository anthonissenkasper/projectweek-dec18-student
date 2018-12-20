import Grid, { Generators } from "../../src/be-sushi-ed/Grid";
import Cell from "../../src/be-sushi-ed/Cell";
import { C } from "../../src/be-sushi-ed/Coords";

let grid : Grid;

beforeEach(() => {
  grid = new Grid(10, 10, Generators.solid, {fillCell: new Cell("normal", 0)});
});

test('possible move orientationsnone', () => {
  let coords = C(5, 5);
  grid.setCell(C(4, 4), new Cell("normal", 1));
  grid.setCell(coords, new Cell("normal", 1));
  expect(grid.getPossibleMoveOrientations(coords)).toEqual([]);
});

test('possible move orientations up', () => {
  let coords = C(5, 5);
  grid.setCell(C(3, 4), new Cell("normal", 1));
  grid.setCell(C(4, 4), new Cell("normal", 1));
  grid.setCell(coords, new Cell("normal", 1));
  expect(grid.getPossibleMoveOrientations(coords)).toEqual([3]);
});

test('possible move orientations provided', () => {
  let coords = C(5, 5);
  grid.setCell(C(3, 4), new Cell("normal", 1));
  grid.setCell(C(4, 4), new Cell("normal", 1));
  expect(grid.getPossibleMoveOrientations(coords, new Cell("normal", 1))).toEqual([3]);
});

test('legal move', () => {
  let coords = C(5, 5);
  grid.setCell(C(3, 4), new Cell("normal", 1));
  grid.setCell(C(4, 4), new Cell("normal", 1));
  expect(grid.isLegalMove(coords, 3)).toBe(true);
});

test('illegal move', () => {
  let coords = C(5, 5);
  // grid.setCell(C(3, 4), new Cell("normal", 1));
  grid.setCell(C(4, 4), new Cell("normal", 1));
  grid.setCell(coords, new Cell("normal", 1));
  expect(grid.isLegalMove(coords, 3)).toBe(false);
});

test('illegal move provided', () => {
  let coords = C(5, 5);
  // grid.setCell(C(3, 4), new Cell("normal", 1));
  grid.setCell(C(4, 4), new Cell("normal", 1));
  expect(grid.isLegalMove(coords, 3, new Cell("normal", 1))).toBe(false);
});