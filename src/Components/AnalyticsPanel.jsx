import { LineChart, Line, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
export default function AnalyticsPanel({ telemetry }) { const line = telemetry.slice(0,6).map((s,i)=>({name:s.name,v:s.val,stress:Math.max(20,100-s.val)})); return <div className='glass rounded-xl p-4'><h3 className='font-semibold'>Predictive Analytics</h3><div className='grid md:grid-cols-3 gap-3 h-56 mt-2'>
<div><ResponsiveContainer><LineChart data={line}><Line dataKey='v' stroke='#00d9ff'/><Line dataKey='stress' stroke='#7c3aed'/></LineChart></ResponsiveContainer></div>
<div><ResponsiveContainer><PieChart><Pie data={line} dataKey='v' nameKey='name' outerRadius={70} fill='#00d9ff'/></PieChart></ResponsiveContainer></div>
<div><ResponsiveContainer><RadarChart data={line}><PolarGrid/><PolarAngleAxis dataKey='name'/><Radar dataKey='v' stroke='#f97316' fill='#f97316' fillOpacity={0.35}/></RadarChart></ResponsiveContainer></div>
</div></div>; }
