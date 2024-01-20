import { collides } from "./collision.js";
import { keyboard } from "./keyboard.js";

// Setup

const app = new PIXI.Application({
  background: "#1099bb",
  //resizeTo: divMain,
});
divMain.appendChild(app.view);

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

// Sound

const music = PIXI.sound.Sound.from({
  url: "assets/ohg2024a-pre.mp3",
  autoPlay: true,
  loop: true,
  volume: 0.5,
});

// Sprites

const bunny = PIXI.Sprite.from("assets/bunny.png");
{
  bunny.anchor.set(0.5, 0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  bunny.eventMode = "static";
  bunny.cursor = "pointer";
  bunny.on("pointerdown", () => {
    bunny.scale.x *= 1.25;
    bunny.scale.y *= 1.25;
  });

  app.stage.addChild(bunny);
}

const wave = new PIXI.Text("o/");
{
  wave.x = 50;
  wave.y = 100;

  app.stage.addChild(wave);
}

// Keypresses

window.addEventListener("keydown", (ev) => {
  if (ev.code === "KeyM") {
    music.paused = !music.paused;
  }
});

// Frame

app.ticker.add((delta) => {
  bunny.rotation -= 0.01 * delta;
  wave.x += keyboard.dir.x;
  wave.y += keyboard.dir.y;

  if (collides(wave, bunny)) {
    bunny.tint = 0x00ff00;
  } else {
    bunny.tint = 0xffffff;
  }
});
