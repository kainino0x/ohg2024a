import { pressed } from "../../keys.js";

export function register(dirRegistry) {
  dirRegistry.up.push(() => !!pressed.KeyW);
  dirRegistry.down.push(() => !!pressed.KeyS);
  dirRegistry.left.push(() => !!pressed.KeyA);
  dirRegistry.right.push(() => !!pressed.KeyD);
}
