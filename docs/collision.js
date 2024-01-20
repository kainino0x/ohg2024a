export function collides(spriteA, spriteB) {
    const a = spriteA.getBounds();
    const b = spriteB.getBounds();
    return a.intersects(b);
}
