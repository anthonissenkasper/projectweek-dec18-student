
let loaderInfo = document.querySelector("#loader-info");
let gameError = document.querySelector("#game-error");

function load() {
  loaderInfo.textContent = "Loading be-sushi-ed...";
  import("./be-sushi-ed/index.js").then(beSushiEd => {
    console.log("fsddfs")
    let game = new beSushiEd.Game();
    game.init();
    // while (true) {
    //   game.draw();
    // }

    loaderInfo.classList.add("hidden");
  }).catch(err => {
    gameError.textContent = err;
  });
}

window.addEventListener("load", _ => {
  load();
});

if (document.readyState == "complete") {
  load();
}
