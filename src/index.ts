function removeLoaderError() {
  let loaderInitError = document.querySelector("#loader-init-error");
  if (loaderInitError !== null) {
    console.log(loaderInitError);
    loaderInitError.classList.add("hidden");
  }
}

function handleGameError(err: Error) {
  let eGameError = document.querySelector("#game-error");
  if (eGameError !== null) {
    eGameError.textContent = String(err);
    console.error(err);
  }
}

function startGame(beSushiEd: any) {
  let game = new beSushiEd.Game();
  let ui = new beSushiEd.Ui(document.body, game)
  ui.init();
  ui.draw();
}

function load() {
  removeLoaderError();

  let eLoaderInfo = document.querySelector("#loader-info")!;
  
  if (eLoaderInfo !== null) {
    eLoaderInfo.textContent = "Loading be-sushi-ed...";
    import("./be-sushi-ed/index").then(beSushiEd => {
      startGame(beSushiEd);
      eLoaderInfo.classList.add("hidden");
    }).catch(handleGameError);
  }
}

window.addEventListener("load", _ => {
  load();
});

if (document.readyState == "complete") {
  load();
}
