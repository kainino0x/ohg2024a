import { pressed } from "../../keys.js";

export function register(dirRegistry) {
  dirRegistry.up.push(() => !!pressed.ArrowUp);
  dirRegistry.down.push(() => !!pressed.ArrowDown);
  dirRegistry.left.push(() => !!pressed.ArrowLeft);
  dirRegistry.right.push(() => !!pressed.ArrowRight);
}
