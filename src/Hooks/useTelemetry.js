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
import { useEffect, useState } from 'react';
import { sensorSeed } from '../MockData/mockData';

export function useTelemetry() {
  const [sensors, setSensors] = useState(sensorSeed.map(([name,unit,val,min,max])=>({name,unit,val,min,max,history:[val]})));
  useEffect(()=>{ const t=setInterval(()=>setSensors(prev=>prev.map(s=>{ const d=(Math.random()-0.5)*6; const val=Math.max(s.min,Math.min(s.max,s.val+d)); return {...s,val:+val.toFixed(1),history:[...s.history.slice(-19),+val.toFixed(1)]}; })),1200); return ()=>clearInterval(t);},[]);
  return sensors;
}
