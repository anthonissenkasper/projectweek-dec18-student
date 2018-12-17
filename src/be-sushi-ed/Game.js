import _ from 'lodash';
import * as PIXI from 'pixi.js'

import Grid from "./Grid"

export default class Game {
  constructor() {
    console.log(Grid);
    this._grid = new Grid(8, 8);
    console.log(this._grid);
  }

  init() {
    // console.log("Sushi crush");


    // // The application will create a renderer using WebGL, if possible,
    // // with a fallback to a canvas render. It will also setup the ticker
    // // and the root stage PIXI.Container
    // const app = new PIXI.Application();
    
    // // The application will create a canvas element for you that you
    // // can then insert into the DOM
    // document.body.appendChild(app.view);
    
    // let rectangle = new PIXI.Graphics();
    // rectangle.lineStyle(4, 0xFF3300, 1);
    // rectangle.beginFill(0x66CCFF);
    // rectangle.drawRect(0, 0, 64, 64);
    // rectangle.endFill();
    // rectangle.x = 170;
    // rectangle.y = 170;
    // app.stage.addChild(rectangle);
  }

  draw() {

  }


}