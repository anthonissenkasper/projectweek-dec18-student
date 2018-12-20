import Grid, { Generators } from "../../src/be-sushi-ed/Grid";
import { C, Coords } from "../../src/be-sushi-ed/Coords";
import Cell from "../../src/be-sushi-ed/Cell";

let grid : Grid;

beforeEach(() => {
  grid = new Grid(8, 5, Generators.random);
});


test('horizontal score 2', () => {
  let a = new Cell("normal", 0);
  let b = new Cell("normal", 1);
  let coords = C(4, 2);
  grid.setCell(coords, a);

  grid.setCell(C(3, 2), a);
  grid.setCell(C(2, 2), b);

  grid.setCell(C(5, 2), a);
  grid.setCell(C(6, 2), b);

  let actual = grid.horizontalGroupSize(coords);
  expect(actual).toBe(3);
});

test('horizontal score 2 provided cell', () => {
  let a = new Cell("normal", 0);
  let b = new Cell("normal", 1);
  let coords = C(4, 2);
  grid.setCell(coords, b);

  grid.setCell(C(3, 2), a);
  grid.setCell(C(2, 2), b);

  grid.setCell(C(5, 2), a);
  grid.setCell(C(6, 2), b);

  let actual = grid.horizontalGroupSize(coords, a);
  expect(actual).toBe(3);
});
