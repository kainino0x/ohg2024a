export const keyboard = {
  pressed: {},
  get x() {
    return (
      (this.pressed.ArrowRight || this.pressed.KeyD ? 1 : 0) -
      (this.pressed.ArrowLeft || this.pressed.KeyA ? 1 : 0)
    );
  },
  get y() {
    return (
      (this.pressed.ArrowDown || this.pressed.KeyS ? 1 : 0) -
      (this.pressed.ArrowUp || this.pressed.KeyW ? 1 : 0)
    );
  },
  get dir() {
    const mag = Math.sqrt(this.x ** 2 + this.y ** 2);
    dir.x = mag ? this.x / mag : 0;
    dir.y = mag ? this.y / mag : 0;
    return dir;
  },
};
const dir = new PIXI.Point();

window.addEventListener("keydown", (ev) => {
  keyboard.pressed[ev.code] = true;
});
window.addEventListener("keyup", (ev) => {
  keyboard.pressed[ev.code] = false;
});
