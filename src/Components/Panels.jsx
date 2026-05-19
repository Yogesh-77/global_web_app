import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, Tooltip } from 'recharts'
import { Brain, Shield, Wifi, Clock3, AlertTriangle, Mic, MicOff, Camera, Activity, Cpu } from 'lucide-react'
import Webcam from 'react-webcam'

const levelClass = { Critical: 'border-red-500 bg-red-950/30', High: 'border-orange-500 bg-orange-950/20', Medium: 'border-yellow-500 bg-yellow-950/15', Low: 'border-emerald-500 bg-emerald-950/20' }
const pillClass = { Critical: 'text-red-300 border-red-500', High: 'text-orange-300 border-orange-500', Medium: 'text-yellow-300 border-yellow-500', Low: 'text-emerald-300 border-emerald-500' }

export const TopHeader = ({ aiConfidence, sysHealth, criticalCount }) => (
  <header className='panel px-6 py-4 flex items-center justify-between border-b border-cyan-400/20 sticky top-0 z-40'>
    <div className='flex items-center gap-3'><Brain className='text-indigo-400' /><div><h1 className='text-xl font-bold tracking-widest'>COGNITIVE-AWARE AI ALARM PRIORITIZATION</h1><p className='text-xs text-slate-400'>ADAPTIVE HMI SYSTEM v2.4.1</p></div></div>
    <div className='flex items-center gap-4 text-sm'>
      <span className='flex items-center gap-1 text-green-400'><Shield size={14} /> SYS {sysHealth}%</span>
      <span className='flex items-center gap-1 text-indigo-400'><Cpu size={14} /> AI {aiConfidence}%</span>
      <span className='badge text-green-400'>NORMAL OPS</span>
      <span className='flex items-center gap-1 text-green-300'><Wifi size={14} /> LIVE</span>
      <span className='flex items-center gap-1 text-slate-200'><Clock3 size={14} /> {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}</span>
      <span className='px-3 py-1 rounded-lg border border-red-500 text-red-300'>{criticalCount} CRITICAL</span>
    </div>
  </header>
)

export const SensorCard = ({ s }) => (
  <motion.div layout className='panel p-4 rounded-2xl'>
    <div className='flex justify-between'><h3 className='tracking-widest text-slate-300'>{s.name.toUpperCase()}</h3><Activity size={18} className='text-slate-500' /></div>
    <div className='text-4xl font-bold mt-2' style={{ color: s.color }}>{s.value.toFixed(2)}<span className='text-lg ml-1 text-slate-300'>{s.unit}</span></div>
    <div className='h-1.5 bg-slate-800 rounded mt-3'><div className='h-full rounded' style={{ width: `${(s.value / s.max) * 100}%`, background: s.color }} /></div>
    <div className='h-16 mt-3'><ResponsiveContainer><LineChart data={s.trend}><Line dataKey='v' stroke={s.color} dot={false} strokeWidth={2} /></LineChart></ResponsiveContainer></div>
  </motion.div>
)

export const AlarmCenter = ({ alarms, onPriorityChange }) => (
  <section className='panel p-4 rounded-2xl'>
    <h3 className='title'><AlertTriangle size={16} /> ALARM PRIORITIZATION</h3>
    <div className='space-y-3 mt-3'>
      {alarms.map((a) => (
        <div key={a.id} className={`rounded-xl border p-4 ${levelClass[a.priority]}`}>
          <div className='grid md:grid-cols-[1.4fr_.6fr_.8fr_.7fr] gap-2 items-center'>
            <div><p className='text-2xl font-semibold'>{a.title}</p><p className='text-slate-400'>{a.zone} • {a.ts}</p></div>
            <div className={`text-center border rounded px-2 py-1 font-bold ${pillClass[a.priority]}`}>{a.priority.toUpperCase()}</div>
            <div className='text-cyan-200'>→ {a.action}</div>
            <select className='select' value={a.priority} onChange={(e) => onPriorityChange(a.id, e.target.value)}>{['Critical', 'High', 'Medium', 'Low'].map((x) => <option key={x}>{x}</option>)}</select>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export const EmotionVoicePanel = ({ emotion, setEmotion, emotionConfidence, transcript, history, listening, onStartVoice, onStopVoice, aiResponse }) => (
  <section className='panel p-4 rounded-2xl space-y-4'>
    <h3 className='title'><Camera size={16} /> WEBCAM + VOICE COGNITIVE ENGINE</h3>
    <div className='grid lg:grid-cols-2 gap-4'>
      <div>
        <div className='h-52 rounded-xl overflow-hidden border border-cyan-500/40 relative'>
          <Webcam audio={false} className='w-full h-full object-cover' />
          <div className='absolute inset-6 border-2 border-green-400/70 rounded-xl animate-pulse' />
        </div>
        <div className='mt-2 flex gap-2 items-center'><select className='select' value={emotion} onChange={(e) => setEmotion(e.target.value)}>{['Normal', 'Focused', 'Stressed', 'Fatigued', 'Overloaded'].map((x) => <option key={x}>{x}</option>)}</select><span className='text-sm text-cyan-200'>Confidence: {emotionConfidence}%</span></div>
      </div>
      <div>
        <div className='flex gap-2'><button className='btn' onClick={onStartVoice}><Mic size={14} /> Start</button><button className='btn' onClick={onStopVoice}><MicOff size={14} /> Stop</button><span className={`${listening ? 'text-green-400' : 'text-slate-400'} text-sm`}>{listening ? 'Listening' : 'Idle'}</span></div>
        <p className='mt-3 text-sm border border-cyan-500/20 rounded p-2 min-h-12'>{transcript || 'Say: show critical alarms, activate emergency mode, simplify dashboard, reset alarms, system status, start, stop'}</p>
        <p className='text-sm mt-2 text-indigo-300'>AI: {aiResponse}</p>
        <div className='text-xs mt-2 space-y-1 max-h-20 overflow-auto'>{history.map((h, i) => <p key={i}>• {h}</p>)}</div>
      </div>
    </div>
  </section>
)

export const RightCharts = ({ alarmFreq, categories, cognitiveTrend, cognizantScore }) => <section className='space-y-4'><div className='panel p-4 rounded-2xl'><h3 className='title'>ALARM FREQUENCY MATRIX</h3><div className='h-44'><ResponsiveContainer><BarChart data={alarmFreq}><XAxis dataKey='hour' tick={{ fill: '#94a3b8', fontSize: 11 }} /><Tooltip contentStyle={{ background: '#08142c', border: '1px solid #1d4ed8' }} /><Bar dataKey='Critical' fill='#ef4444' radius={[3,3,0,0]} /><Bar dataKey='High' fill='#f97316' radius={[3,3,0,0]} /><Bar dataKey='Medium' fill='#eab308' radius={[3,3,0,0]} /><Bar dataKey='Low' fill='#22c55e' radius={[3,3,0,0]} /></BarChart></ResponsiveContainer></div></div><div className='panel p-4 rounded-2xl'><h3 className='title'>COGNIZANT RESPONSE FREQUENCY</h3><div className='h-36'><ResponsiveContainer><AreaChart data={cognitiveTrend}><XAxis dataKey='t' tick={{ fill: '#94a3b8', fontSize: 10 }} /><Tooltip contentStyle={{ background: '#08142c', border: '1px solid #7c3aed' }} /><Area dataKey='focus' stroke='#22c55e' fill='#22c55e33' /><Area dataKey='fatigue' stroke='#a855f7' fill='#a855f733' /></AreaChart></ResponsiveContainer></div><div className='mt-2 text-sm text-cyan-200'>Cognizant Stability Index: <span className='text-emerald-300 font-semibold'>{cognizantScore}%</span></div></div><div className='panel p-4 rounded-2xl'><h3 className='title'>ALARM CATEGORIES</h3><div className='h-44'><ResponsiveContainer><PieChart><Pie data={categories} dataKey='value' innerRadius={35} outerRadius={70}>{categories.map((c) => <Cell key={c.name} fill={c.color} />)}</Pie></PieChart></ResponsiveContainer></div></div></section>
