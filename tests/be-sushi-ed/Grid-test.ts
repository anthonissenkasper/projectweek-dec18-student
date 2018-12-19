import Grid from "../../src/be-sushi-ed/Grid";
import Cell from "../../src/be-sushi-ed/Cell";

let grid : Grid;

beforeEach(() => {
  grid = new Grid(8, 5, "solid", new Cell("normal", 0));
});

test('Cell', () => {
  let actual = grid.Cell(0, 0);
  let expected = new Cell("normal", 0);
  expect(actual).toEqual(expected);
});