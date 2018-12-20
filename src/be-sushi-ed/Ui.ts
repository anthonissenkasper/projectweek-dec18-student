import { Game } from "./index";
import * as PIXI from 'pixi.js'
import { Coords, C } from "./Coords";

export default class Ui {
  _parent: HTMLElement;
  _pa: PIXI.Application;
  _game: Game;

  constructor(parent: HTMLElement, game: Game) {
    this._parent = parent;
    this._pa = new PIXI.Application();
    this._game = game;
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
    rectangle.x = 170;
    rectangle.y = 170;
    this._pa.stage.addChild(rectangle);
  }

  draw() {
    const colors = [
      0x66CCFF,
      0xFF2222,
      0x00DDFF,
      0x0000FF,
      0xFF0000,
      0x66CCFF
    ]

    for (let y = 0; y < this._game.h; y++) {
      for (let x = 0; x < this._game.w; x++) {
        let cell = this._game.Cell(C(x, y));
        let rectangle = new PIXI.Graphics();
        rectangle.beginFill(colors[cell.color]);
        rectangle.drawRect(0, 0, 30, 30);
        rectangle.endFill();
        var sprite = new PIXI.Sprite(rectangle.generateCanvasTexture());
        sprite.x = x * 50 + 20;
        sprite.y = y * 50 + 20;
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on('mousedown', () => console.log(x + " " + y));
        this._pa.stage.addChild(sprite);
      }
    }
  }
}