import { useEffect, useState } from 'react';
import { sensorSeed } from '../MockData/mockData';

export function useTelemetry() {
  const [sensors, setSensors] = useState(sensorSeed.map(([name,unit,val,min,max])=>({name,unit,val,min,max,history:[val]})));
  useEffect(()=>{ const t=setInterval(()=>setSensors(prev=>prev.map(s=>{ const d=(Math.random()-0.5)*6; const val=Math.max(s.min,Math.min(s.max,s.val+d)); return {...s,val:+val.toFixed(1),history:[...s.history.slice(-19),+val.toFixed(1)]}; })),1200); return ()=>clearInterval(t);},[]);
  return sensors;
}
