import { Game, Grid } from "./index";
import * as PIXI from 'pixi.js'
import { Coords, C } from "./Coords";

const BACKGROUND_IMG_PATH = "static/background.jpg";
const CELL_ICON_PATH = "static/icons/";
const CELL_ICON_NAMES = [
  "Sushi1orange.1.png",
  "Sushi1red.1.png",
  "Sushi3yellow.1.png",
  "sushi1yellow.1.png",
  "sushi2orange.1.png",
  "sushi2red.1.png",
  "sushi2yellow.1.png",
  "sushi3orange.1.png",
  "sushi3red.1.png"
]

type Orientation = 0 | 1 | 2 | 3;

type changeState = {
  changed: Coords[],
  grid: Grid
}

export default class Ui {
  _parent: HTMLElement;
  _pa: PIXI.Application;
  _game: Game;
  _iconsContainer: PIXI.Container;
  _selection: Coords | null = null;
  _lastMoveInvalid: boolean = false;
  _updatedCoords: Coords[] = [];
  _animationActive: boolean = false;

  constructor(parent: HTMLElement, game: Game) {
    this._parent = parent;
    this._game = game;

    this._pa = new PIXI.Application({
      backgroundColor: 0xFFFFFF,
      resolution: devicePixelRatio 
    });

    let bgTexture = PIXI.Texture.fromImage(BACKGROUND_IMG_PATH);
    let background = new PIXI.extras.TilingSprite(bgTexture, 2560, 2560);
    this._pa.stage.addChild(background);

    this._pa.view.width = 650;

    this._iconsContainer  = new PIXI.Container();
    this._iconsContainer.position = new PIXI.Point(40, 40);
    this._pa.stage.addChild(this._iconsContainer);
  }

  init() {
    this._parent.appendChild(this._pa.view);
  }

  testDraw() {
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = 0;
    rectangle.y = 0;
    this._pa.stage.addChild(rectangle);
  }

  handleSushiClick(coords: Coords) {
    if (!this._animationActive) {
      if (this._selection === null) {
        this._selection = coords;
      } else if (this._selection.equals(coords)) {
        this._selection = null;
        this._lastMoveInvalid = false;
      } else {
        if (this.swap(this._selection, coords)) {
          this._selection = null;
          this._lastMoveInvalid = false;
        } else {
          this._lastMoveInvalid = true;
        }
      }
      this.draw();
    }
  }
 
  draw(grid: Grid = this._game._grid) {
    this._iconsContainer.removeChildren();

    for (const updatedCoord of this._updatedCoords) {
      let rectangle = new PIXI.Graphics();
      rectangle.beginFill(0x888888, 0.5);
      rectangle.drawRect(updatedCoord.x * 110, updatedCoord.y * 110, 110, 110);
      rectangle.endFill();
      this._iconsContainer.addChild(rectangle);
    }

    if (this._selection !== null) {
      let rectangle = new PIXI.Graphics();
      let color = this._lastMoveInvalid ? 0xff4444 : 0x66CCFF;
      rectangle.beginFill(color, 0.5);
      rectangle.drawRect(this._selection.x * 110, this._selection.y * 110, 110, 110);
      rectangle.endFill();
      this._iconsContainer.addChild(rectangle);
    }

    for (let y = 0; y < grid.h; y++) {
      for (let x = 0; x < grid.w; x++) {
        let cell = grid.Cell(C(x, y));
        if (cell !== null) {
          let texture = PIXI.Texture.fromImage(CELL_ICON_PATH + CELL_ICON_NAMES[cell.color]);
          let sprite: PIXI.Sprite = new PIXI.Sprite(texture);
          sprite.x = x * 110;
          sprite.y = y * 110;
          sprite.scale.set(0.2, 0.2);
          sprite.interactive = true;
          sprite.buttonMode = true;
          sprite.on('mousedown', () => this.handleSushiClick(C(x, y)));
          this._iconsContainer.addChild(sprite);
        }
      }
    }
  }

  swap(coordsA: Coords, coordsB: Coords) {
    let changeQueue: Array<changeState|null> = [];
    if (this._game.swapByCoords(coordsA, coordsB, (changed: Coords[], grid: Grid) => changeQueue.push({changed: changed, grid: grid}))) {
      this.draw();
      this._animationActive = true;
      changeQueue.push(null);
      for (let i = 0; i < changeQueue.length; i++) {
        const change = changeQueue[i];
        let a = this;
        window.setTimeout(() => {
          if (change !== null) {
            this._updatedCoords = change.changed;
            this.draw(change.grid);
            this._updatedCoords = [];
          } else {
            a._animationActive = false;
            this.draw();
          }
        }, i * 1000);
      }
      return true;
    } else {
      return false;
    }
  }
}