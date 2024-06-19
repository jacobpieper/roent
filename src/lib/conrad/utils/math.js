export function probability(k, lambda) {
  const numerator = Math.exp(-lambda) * Math.pow(lambda, k)
  const denominator = factorial(k)
  return numerator / denominator
}

export function factorial(n) {
  if (n === 0 || n === 1) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

export function lerp(start, end, t) {
  return start + (end - start) * t
}
