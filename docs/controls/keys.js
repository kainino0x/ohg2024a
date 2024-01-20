export const pressed = {};

window.addEventListener("keydown", (ev) => {
  pressed[ev.code] = true;
});
window.addEventListener("keyup", (ev) => {
  pressed[ev.code] = false;
});