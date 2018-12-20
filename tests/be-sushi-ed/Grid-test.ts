import Grid, { Generators } from "../../src/be-sushi-ed/Grid";
import Cell from "../../src/be-sushi-ed/Cell";
import InvalidValueException from "../../src/be-sushi-ed/exceptions/InvalidValueException";
import { Coords } from "../../src/be-sushi-ed/Coords";

let grid : Grid;

beforeEach(() => {
  grid = new Grid(8, 5, Generators.smart);
});

test('Cell()', () => {
  let coords = new Coords(0, 0);
  let actual = grid.Cell(coords);
  let expected = grid.Cell(coords);
  expect(actual).toEqual(expected);
});

test('Cell out of bounds left', () => {
  try {
    grid.Cell(new Coords(-5, 0));
  } catch (err) {
    expect(err.name).toBe("InvalidValueException");
  }
});

test('Cell out of bounds right', () => {
  try {
    grid.Cell(new Coords(10, 0));
  } catch (err) {
    expect(err.name).toBe("InvalidValueException");
  }
});

test('setCell origin', () => {
  let cell = new Cell("flaming", 0);
  let coords = new Coords(0, 0);
  grid.setCell(coords, cell)

  let actual = grid.Cell(coords);
  let expected = cell;
  expect(actual).toEqual(expected);
});

test('setCell middle', () => {
  let cell = new Cell("flaming", 0);
  let coords = new Coords(4, 2);
  grid.setCell(coords, cell)

  let actual = grid.Cell(coords);
  let expected = cell;
  expect(actual).toEqual(expected);
});

