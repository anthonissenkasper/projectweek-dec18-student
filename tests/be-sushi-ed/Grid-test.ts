import Grid from "../../src/be-sushi-ed/Grid";
import Cell from "../../src/be-sushi-ed/Cell";
import InvalidValueException from "../../src/be-sushi-ed/exceptions/InvalidValueException";

let grid : Grid;

beforeEach(() => {
  grid = new Grid(8, 5, "solid", new Cell("normal", 0));
});

test('Cell origin', () => {
  let actual = grid.Cell(0, 0);
  let expected = new Cell("normal", 0);
  expect(actual).toEqual(expected);
});

test('Cell out of bounds left', () => {
  expect(() => {
    grid.Cell(-5, 0);
  }).toThrow(InvalidValueException);
});

test('Cell out of bounds right', () => {
  expect(() => {
    grid.Cell(10, 0);
  }).toThrow(InvalidValueException);
});

test('setCell origin', () => {
  let cell = new Cell("flaming", 0);
  grid.setCell(0, 0, cell)

  let actual = grid.Cell(0, 0);
  let expected = cell;
  expect(actual).toEqual(expected);
});

test('setCell middle', () => {
  let cell = new Cell("flaming", 0);
  grid.setCell(4, 2, cell)

  let actual = grid.Cell(4, 2);
  let expected = cell;
  expect(actual).toEqual(expected);
});
