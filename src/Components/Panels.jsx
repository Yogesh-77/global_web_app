import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import { AlertTriangle, Mic, MicOff, Camera, Cpu } from 'lucide-react'
import Webcam from 'react-webcam'

export const Header = ({ emergency, aiConfidence, health }) => (
  <div className={`glass p-4 relative overflow-hidden ${emergency ? 'animate-pulse-red border-red-500/70' : ''}`}>
    <div className='absolute top-0 left-0 h-0.5 w-1/2 bg-cyan-300/80 animate-scan' />
    <div className='flex flex-wrap gap-4 justify-between items-center'>
      <h1 className='text-lg md:text-2xl font-semibold text-cyan-200'>Cognitive-Aware AI Alarm Prioritization & Adaptive HMI System</h1>
      <div className='flex gap-4 text-xs md:text-sm'>
        <span>AI: {aiConfidence}%</span><span>Health: {health}%</span><span>{new Date().toLocaleString()}</span><span className='text-green-400'>Connected</span>
      </div>
    </div>
  </div>
)

export const SensorCard = ({ s }) => <motion.div layout className='glass p-3'><div className='flex justify-between'><span>{s.name}</span><span style={{ color: s.color }}>{s.value.toFixed(1)} {s.unit}</span></div><div className='h-16'><ResponsiveContainer width='100%' height='100%'><LineChart data={s.trend}><Line dataKey='v' stroke={s.color} dot={false} /></LineChart></ResponsiveContainer></div></motion.div>

export const AlarmCenter = ({ alarms, setEmergency, setAlarms }) => (
  <div className='glass p-4'>
    <h3 className='font-semibold mb-2 flex items-center gap-2'><AlertTriangle className='text-red-400' /> AI Alarm Center</h3>
    <AnimatePresence>
      {alarms.map((a) => <motion.div key={a.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-2 p-3 rounded-lg border ${a.priority === 'Critical' ? 'border-red-500 bg-red-900/20 animate-pulse-red' : 'border-cyan-500/20'}`}>
        <div className='flex justify-between'><b>{a.title}</b><span>{a.priority}</span></div><div className='text-xs'>{a.zone} • AI {a.confidence}% • {a.ts}</div><div className='text-xs text-cyan-200'>{a.action}</div>
        <button className='text-xs mt-2 px-2 py-1 bg-red-500/20 rounded' onClick={() => setEmergency(a.priority === 'Critical')}>Trigger Focus</button>
        <button className='text-xs mt-2 ml-2 px-2 py-1 bg-cyan-500/20 rounded' onClick={() => setAlarms((prev) => prev.filter((x) => x.id !== a.id))}>Reset</button>
      </motion.div>)}
    </AnimatePresence>
  </div>
)

export const VoicePanel = ({ listening, transcript, history, onToggle }) => <div className='glass p-4'><h3 className='font-semibold mb-2'>Voice Command Center</h3><button onClick={onToggle} className='flex items-center gap-2 px-3 py-2 rounded bg-cyan-500/20'>{listening ? <Mic className='animate-pulse text-cyan-300' /> : <MicOff />} {listening ? 'Listening' : 'Start'}</button><p className='mt-2 text-sm'>{transcript || 'Awaiting command...'}</p><div className='text-xs mt-2 space-y-1'>{history.slice(-4).map((h, i) => <div key={i}>• {h}</div>)}</div></div>

export const WebcamPanel = ({ emotion, setEmotion }) => <div className='glass p-4'><h3 className='font-semibold mb-2 flex items-center gap-2'><Camera size={16} /> Webcam Emotion</h3><div className='h-40 bg-black/40 rounded border border-cyan-400/40 overflow-hidden'><Webcam audio={false} className='w-full h-full object-cover' /></div><select value={emotion} onChange={(e) => setEmotion(e.target.value)} className='mt-2 bg-slate-900 border border-cyan-700 rounded px-2 py-1 text-sm'>{['Normal', 'Focused', 'Stressed', 'Fatigued', 'Overloaded'].map((e) => <option key={e}>{e}</option>)}</select></div>

export const Analytics = ({ data }) => <div className='glass p-4'><h3 className='font-semibold mb-2 flex items-center gap-2'><Cpu size={16} /> Predictive Analytics</h3><div className='grid md:grid-cols-2 gap-4 h-64'><ResponsiveContainer><PieChart><Pie data={data} dataKey='value' nameKey='name' outerRadius={70} fill='#00d9ff' /></PieChart></ResponsiveContainer><ResponsiveContainer><RadarChart data={data}><PolarGrid /><PolarAngleAxis dataKey='name' /><Radar dataKey='value' stroke='#7c3aed' fill='#7c3aed' fillOpacity={0.5} /></RadarChart></ResponsiveContainer></div></div>
