export const inferRiskLevel = (sensors = []) => sensors.reduce((acc, s) => acc + s.value / s.max, 0) / Math.max(sensors.length, 1)
