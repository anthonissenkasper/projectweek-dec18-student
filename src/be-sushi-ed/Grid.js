export default class Grid {
  constructor(w, h) {
    this.genCells(w, h);
  }

  genCells(w, h) {
    this._cells = new Array(h);
    for (let y = 0; y < h; y++) {
      this._cells[y] = new Array(w).fill("a");
    }
  }
}