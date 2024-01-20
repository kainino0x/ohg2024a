import { collides } from "./collision.js";
import { keyboard } from "./keyboard.js";

// Setup

const app = new PIXI.Application({
  background: "#44ccff",
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

const ridges = [];
let advanceRidgeTo;
{
  for (let i = 0; i < 40; ++i) {
    const r = (ridges[i] = PIXI.Sprite.from("assets/ridge.png"));
    r.scale.set(20, 20);
    r.x = i * 20;

    app.stage.addChild(r);
  }

  let ridgeHeight = 200;
  let lastTime = 0;
  let ringBufferIndex = 0;
  const advanceRidge = () => {
    ridgeHeight = Math.max(
      200,
      Math.min(500, ridgeHeight + (Math.random() * 2 - 1) * 20)
    );
    for (let i = 0; i < 39; ++i) {
      ridges[i].y = ridges[i + 1].y;
    }
    ridges[39].y = ridgeHeight;
    ringBufferIndex = (ringBufferIndex + 1) % 40;
  };
  for (let i = 0; i < 40; ++i) {
    advanceRidge();
  }

  advanceRidgeTo = (time) => {
    if (lastTime < time) {
      advanceRidge();
      lastTime += 1000 / speed;
      return true;
    }
    return false;
  };
}

const skier = PIXI.Sprite.from("assets/skier.png");
{
  skier.anchor.set(0.6, 0.8);
  skier.x = 295;

  //skier.eventMode = "static";
  //skier.cursor = "pointer";
  //skier.on("pointerdown", () => {
  //  skier.scale.x *= 1.25;
  //  skier.scale.y *= 1.25;
  //});

  app.stage.addChild(skier);
}

const text = new PIXI.Text("100");
{
  text.x = 600;
  text.y = 50;
  text.style.fontSize = 50;
  text.pivot.set(text.width * 0.45, text.height * 0.65);

  app.stage.addChild(text);
}

const circle = new PIXI.Graphics();
{
  circle.beginFill(0xffffff);
  circle.drawCircle(30, 30, 30);
  circle.endFill();
  app.stage.addChild(circle);
}

// Keypresses

window.addEventListener("keydown", (ev) => {
  if (ev.code === "KeyM") {
    music.paused = !music.paused;
  }
});

// Frame

let speed = 20;
let time = 0;
let nextRidgeDelta = 0;
let hp = 100;
app.ticker.add((delta) => {
  time += delta;
  speed = 20 + (time / 100);

  skier.y = ridges[14].y;
  skier.rotation = keyboard.dir.x * 0.4;
  const midHeightTarget = -keyboard.dir.x * 10;
  const minHeightTarget = midHeightTarget - 10.01;
  const maxHeightTarget = midHeightTarget + 10.01;

  const pass = minHeightTarget < nextRidgeDelta && nextRidgeDelta < maxHeightTarget;
  ridges[14].tint = pass ? 0x8888ff : 0xffff00;

  if (advanceRidgeTo(time)) {
    console.log('speed', speed);
    ridges[14].tint = 0x8888ff;
    nextRidgeDelta = ridges[14].y - ridges[15].y;
    console.log(nextRidgeDelta, minHeightTarget, maxHeightTarget);

    if (!pass) {
      hp--;
      text.text = hp;
      text.style.fill = 'red';
    } else {
      text.style.fill = 'black';
    }
  }
});
