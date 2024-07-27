interface RandomGenerator {
  x: number;
  y: number;
}

export function randomGenerator(): RandomGenerator {
  return {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  };
}
