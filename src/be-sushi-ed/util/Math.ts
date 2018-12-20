// Constant-sign mod (how modulo should behave)
export function csMod(a: number, b: number) {
  return ((a%b)+b)%b;
};

// Invert negative zero (because IEEE floating point)
export function invNZ(a: number) {
  return (a - 1 + 1);
};

export const TAU = Math.PI * 2;