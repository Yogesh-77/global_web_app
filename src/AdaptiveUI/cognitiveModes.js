export const cognitiveModeFromEmotion = (emotion) => {
  if (emotion === 'Overloaded') return 'OVERLOAD'
  if (emotion === 'Stressed') return 'STRESS'
  return 'NORMAL'
}
