export default function DigitalTwin({ alarms }) { const critical = alarms.some(a=>a.priority==='Critical'); return <div className='glass rounded-xl p-4'><h3 className='font-semibold'>Digital Twin Visualization</h3><svg viewBox='0 0 420 170' className='w-full mt-2 rounded bg-slate-950/70'>
<rect x='20' y='40' width='120' height='90' rx='10' fill='#13203a' stroke={critical?'#ef4444':'#00d9ff'}/><rect x='160' y='20' width='100' height='60' rx='10' fill='#13203a' stroke='#7c3aed'/><rect x='280' y='40' width='120' height='90' rx='10' fill='#13203a' stroke='#00d9ff'/>
<line x1='140' y1='85' x2='160' y2='50' stroke='#00d9ff'/><line x1='260' y1='50' x2='280' y2='85' stroke='#00d9ff'/>
<circle cx='80' cy='85' r='7' fill={critical?'#ef4444':'#22c55e'}><animate attributeName='r' values='5;9;5' dur='1.5s' repeatCount='indefinite'/></circle>
</svg></div>; }
