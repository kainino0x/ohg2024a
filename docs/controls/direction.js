export const dirRegistry = {
  up: [],
  down: [],
  left: [],
  right: [],
};

const ret = new PIXI.Point();
export function dir() {
  const up = dirRegistry.up.some((f) => f());
  const down = dirRegistry.down.some((f) => f());
  const left = dirRegistry.left.some((f) => f());
  const right = dirRegistry.right.some((f) => f());
  const x = right - left;
  const y = down - up;
  const mag = Math.sqrt(x ** 2 + y ** 2);
  ret.x = mag ? x / mag : 0;
  ret.y = mag ? y / mag : 0;
  return ret;
}
