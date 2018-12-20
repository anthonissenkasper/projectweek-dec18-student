import { Coords } from "../../src/be-sushi-ed/Coords";

let coord: Coords;

beforeEach(() => {
  coord = new Coords(8, 6);
});

test('neighbour right', () => {
  let actual = coord.neighbour(0);
  let expected = new Coords(9, 6);
  expect(actual).toEqual(expected);
});

test('neighbour up', () => {
  let actual = coord.neighbour(3);
  let expected = new Coords(8, 5);
  expect(actual).toEqual(expected);
});