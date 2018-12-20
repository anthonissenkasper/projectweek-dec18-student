
let loaderInfo = document.createElement("span")
loaderInfo.classList.add("loader-info");
let gameError = document.createElement("span");
gameError.classList.add("game-error");

document.body.prepend(gameError);
document.body.prepend(loaderInfo);

function removeLoaderError() {
  let loaderInitError = document.querySelector("#loader-init-error");
  if (loaderInitError !== null) {
    console.log(loaderInitError);
    loaderInitError.classList.add("hidden");
  }
}

type Orientation = 0 | 1| 2 | 3;

function load() {
  removeLoaderError();

  loaderInfo.textContent = "Loading be-sushi-ed...";
  import("./be-sushi-ed/index").then(beSushiEd => {
    // let grid = new beSushiEd.Grid(5, 5, beSushiEd.Generators.smart);
    // console.log(grid.gridAsString());
    let game = new beSushiEd.Game();
    let ui = new beSushiEd.Ui(document.body, game)
    ui.init();
    ui.draw();
    // while (true) {
    //   game.draw();
    // }

    loaderInfo.classList.add("hidden");
  }).catch(err => {
    gameError.textContent = err;
    console.error(err);
  });
}

window.addEventListener("load", _ => {
  load();
});

if (document.readyState == "complete") {
  load();
}
