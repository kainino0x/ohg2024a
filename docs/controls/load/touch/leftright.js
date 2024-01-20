export function register(dirRegistry, canvas) {
  let touches;
  let rect;
  const handler = ev => {
    touches = Array.from(ev.targetTouches);
    rect = canvas.getBoundingClientRect();
    ev.preventDefault();
    ev.stopPropagation();
    ev.cancelBubble = true;
    return false;
  };
  canvas.addEventListener('touchstart', handler);
  canvas.addEventListener('touchmove', handler);
  canvas.addEventListener('touchend', handler);
  canvas.addEventListener('touchcancel', handler);

  dirRegistry.left.push(() => touches?.some(t => t.clientX < (rect.left + rect.right) / 2));
  dirRegistry.right.push(() => touches?.some(t => t.clientX > (rect.left + rect.right) / 2));
}