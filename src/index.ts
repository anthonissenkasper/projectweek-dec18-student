
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

function load() {
  removeLoaderError();

  loaderInfo.textContent = "Loading be-sushi-ed...";
  import("./be-sushi-ed/index").then(beSushiEd => {
    let game = new beSushiEd.Game();
    let ui = new beSushiEd.Ui(document.body, game)
    game.init();
    // while (true) {
    //   game.draw();
    // }

    loaderInfo.classList.add("hidden");
  }).catch(err => {
    console.error(err);
    gameError.textContent = err;
  });
}

window.addEventListener("load", _ => {
  load();
});

if (document.readyState == "complete") {
  load();
}
