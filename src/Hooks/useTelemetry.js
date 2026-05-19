import { useEffect, useState } from 'react'
import { sensorConfig } from '../MockData/mockData'

export const useTelemetry = () => {
  const [sensors, setSensors] = useState(sensorConfig.map(([name, unit, max, color, seed]) => ({
    name, unit, max, color, value: seed, trend: Array.from({ length: 16 }, (_, i) => ({ i, v: seed }))
  })))

  useEffect(() => {
    const id = setInterval(() => {
      setSensors((prev) => prev.map((s) => {
        const delta = (Math.random() - 0.5) * s.max * 0.02
        const value = Math.max(0, Math.min(s.max, s.value + delta))
        return { ...s, value, trend: [...s.trend.slice(-15), { i: Date.now(), v: value }] }
      }))
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return sensors
}
