import { useEffect, useState } from 'react'
import { sensorConfig } from '../MockData/mockData'

export const useTelemetry = () => {
  const [sensors, setSensors] = useState(sensorConfig.map(([name, unit, max, color]) => ({ name, unit, max, color, value: max * 0.4, trend: Array.from({ length: 12 }, (_, i) => ({ i, v: max * (0.3 + Math.random() * 0.4) })) })))
  useEffect(() => {
    const id = setInterval(() => setSensors((prev) => prev.map((s) => {
      const delta = (Math.random() - 0.5) * s.max * 0.06
      const value = Math.max(0, Math.min(s.max, s.value + delta))
      return { ...s, value, trend: [...s.trend.slice(-11), { i: Date.now(), v: value }] }
    })), 1200)
    return () => clearInterval(id)
  }, [])
  return sensors
}
