import { motion, AnimatePresence } from 'framer-motion';

export default function AlarmCenter({ alarms, setAlarms, filter, setFilter }) {
  return <div className='glass rounded-xl p-4'>
    <div className='flex justify-between'><h2 className='text-lg font-semibold'>AI Alarm Center</h2><select className='bg-slate-900' value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div>
    <div className='mt-3 space-y-2'>
      <AnimatePresence>{alarms.map(a=><motion.div key={a.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className={`rounded-lg p-3 border ${a.priority==='Critical'?'border-red-400 animate-pulse':'border-cyan-500/40'}`}>
        <div className='flex justify-between'><b>{a.title}</b><span>{a.priority}</span></div><p className='text-xs opacity-80'>{a.zone} • AI {a.aiConfidence}% • {a.recommended}</p>
        <div className='mt-2 flex gap-2'>{['Critical','High','Medium','Low'].map(p=><button key={p} className='text-xs px-2 py-1 bg-slate-900 rounded' onClick={()=>setAlarms(prev=>prev.map(x=>x.id===a.id?{...x,priority:p}:x))}>{p}</button>)}</div>
      </motion.div>)}</AnimatePresence>
    </div></div>;
}
