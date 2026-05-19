import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

export default function SensorCard({ sensor }) {
  const ratio = ((sensor.val - sensor.min) / (sensor.max - sensor.min)) * 100;
  const danger = ratio > 85;
  return <motion.div layout className={`glass rounded-xl p-3 ${danger?'border-red-400 animate-pulse':''}`}>
    <div className='flex justify-between'><h3>{sensor.name}</h3><b className={danger?'text-red-400':'text-cyan-300'}>{sensor.val}{sensor.unit}</b></div>
    <div className='h-2 bg-slate-800 rounded mt-2'><motion.div className='h-2 rounded bg-gradient-to-r from-cyan-400 to-purple-500' animate={{width:`${ratio}%`}} /></div>
    <div className='h-16 mt-2'><ResponsiveContainer><AreaChart data={sensor.history.map((v,i)=>({i,v}))}><Area dataKey='v' stroke='#00d9ff' fill='url(#g)'/></AreaChart></ResponsiveContainer></div>
  </motion.div>;
}
