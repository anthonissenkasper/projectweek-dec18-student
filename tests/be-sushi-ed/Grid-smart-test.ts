import Grid, { Generators } from "../../src/be-sushi-ed/Grid";

let grid : Grid;

beforeEach(() => {
  grid = new Grid(30, 30, Generators.smart);
});


test('no collisions', () => {
  for (let i = 0; i < 20; i++) {
    let coords = grid.randomCoords();
    expect(grid.totalScore(coords) <= 0);
  }
});
