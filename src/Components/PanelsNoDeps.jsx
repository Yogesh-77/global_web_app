import React from 'react'

const levelClass = {
  Critical: 'border-red-500 bg-red-950/30',
  High: 'border-orange-500 bg-orange-950/20',
  Medium: 'border-yellow-500 bg-yellow-950/15',
  Low: 'border-emerald-500 bg-emerald-950/20',
}

const pillClass = {
  Critical: 'text-red-300 border-red-500',
  High: 'text-orange-300 border-orange-500',
  Medium: 'text-yellow-300 border-yellow-500',
  Low: 'text-emerald-300 border-emerald-500',
}

export function TopHeader({ aiConfidence, sysHealth, criticalCount }) {
  return (
    <header className='panel px-6 py-4 flex items-center justify-between border-b border-cyan-400/20 sticky top-0 z-40'>
      <div>
        <h1 className='text-xl font-bold tracking-widest'>COGNITIVE-AWARE AI ALARM PRIORITIZATION</h1>
        <p className='text-xs text-slate-400'>ADAPTIVE HMI SYSTEM v2.4.1</p>
      </div>
      <div className='flex items-center gap-4 text-sm'>
        <span className='text-green-400'>SYS {sysHealth}%</span>
        <span className='text-indigo-400'>AI {aiConfidence}%</span>
        <span className='badge text-green-400'>NORMAL OPS</span>
        <span className='text-green-300'>LIVE</span>
        <span className='text-slate-200'>{new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}</span>
        <span className='px-3 py-1 rounded-lg border border-red-500 text-red-300'>{criticalCount} CRITICAL</span>
      </div>
    </header>
  )
}

export function SensorCard({ s }) {
  return (
    <div className='panel p-4 rounded-2xl'>
      <div className='flex justify-between'>
        <h3 className='tracking-widest text-slate-300'>{s.name.toUpperCase()}</h3>
      </div>
      <div className='text-4xl font-bold mt-2' style={{ color: s.color }}>{s.value.toFixed(2)}<span className='text-lg ml-1 text-slate-300'>{s.unit}</span></div>
      <div className='h-1.5 bg-slate-800 rounded mt-3'>
        <div className='h-full rounded' style={{ width: `${(s.value / s.max) * 100}%`, background: s.color }} />
      </div>
      <div className='h-16 mt-3 flex items-end gap-1'>
        {s.trend.slice(-12).map((p, i) => <div key={i} className='w-2 rounded-t' style={{ height: `${Math.max(4, (p.v / s.max) * 56)}px`, background: s.color }} />)}
      </div>
    </div>
  )
}

export function AlarmCenter({ alarms, onPriorityChange }) {
  return <section className='panel p-4 rounded-2xl'><h3 className='title'>ALARM PRIORITIZATION</h3><div className='space-y-3 mt-3'>{alarms.map((a) => <div key={a.id} className={`rounded-xl border p-4 ${levelClass[a.priority]}`}><div className='grid md:grid-cols-[1.4fr_.6fr_.8fr_.7fr] gap-2 items-center'><div><p className='text-2xl font-semibold'>{a.title}</p><p className='text-slate-400'>{a.zone} • {a.ts}</p></div><div className={`text-center border rounded px-2 py-1 font-bold ${pillClass[a.priority]}`}>{a.priority.toUpperCase()}</div><div className='text-cyan-200'>→ {a.action}</div><select className='select' value={a.priority} onChange={(e) => onPriorityChange(a.id, e.target.value)}>{['Critical', 'High', 'Medium', 'Low'].map((x) => <option key={x}>{x}</option>)}</select></div></div>)}</div></section>
}

export function EmotionVoicePanel({ emotion, setEmotion, emotionConfidence, transcript, history, listening, onStartVoice, onStopVoice, aiResponse }) {
  return <section className='panel p-4 rounded-2xl space-y-4'><h3 className='title'>WEBCAM + VOICE COGNITIVE ENGINE</h3><div className='grid lg:grid-cols-2 gap-4'><div><div className='h-52 rounded-xl overflow-hidden border border-cyan-500/40 relative flex items-center justify-center bg-slate-950'><span className='text-cyan-300 text-sm'>Camera feed placeholder (no dependency mode)</span><div className='absolute inset-6 border-2 border-green-400/70 rounded-xl animate-pulse' /></div><div className='mt-2 flex gap-2 items-center'><select className='select' value={emotion} onChange={(e) => setEmotion(e.target.value)}>{['Normal', 'Focused', 'Stressed', 'Fatigued', 'Overloaded'].map((x) => <option key={x}>{x}</option>)}</select><span className='text-sm text-cyan-200'>Confidence: {emotionConfidence}%</span></div></div><div><div className='flex gap-2'><button className='btn' onClick={onStartVoice}>Start</button><button className='btn' onClick={onStopVoice}>Stop</button><span className={`${listening ? 'text-green-400' : 'text-slate-400'} text-sm`}>{listening ? 'Listening' : 'Idle'}</span></div><p className='mt-3 text-sm border border-cyan-500/20 rounded p-2 min-h-12'>{transcript || 'Say: show critical alarms, activate emergency mode, simplify dashboard, reset alarms, system status, start, stop'}</p><p className='text-sm mt-2 text-indigo-300'>AI: {aiResponse}</p><div className='text-xs mt-2 space-y-1 max-h-20 overflow-auto'>{history.map((h, i) => <p key={i}>• {h}</p>)}</div></div></div></section>
}

export function RightCharts({ alarmFreq, categories, cognitiveTrend, cognizantScore }) {
  return <section className='space-y-4'><div className='panel p-4 rounded-2xl'><h3 className='title'>ALARM FREQUENCY MATRIX</h3><div className='grid grid-cols-7 gap-1 mt-3'>{alarmFreq.map((r) => <div key={r.hour} className='text-center text-[10px] text-slate-400'><div className='h-24 flex items-end gap-[2px] justify-center'>{['Critical','High','Medium','Low'].map((k,c)=><div key={k} className='w-2 rounded-t' style={{height:`${r[k]*7}px`,background:['#ef4444','#f97316','#eab308','#22c55e'][c]}} />)}</div>{r.hour}</div>)}</div></div><div className='panel p-4 rounded-2xl'><h3 className='title'>COGNIZANT RESPONSE FREQUENCY</h3><div className='h-24 mt-3 flex items-end gap-1'>{cognitiveTrend.map((r)=><div key={r.t} className='flex-1 flex gap-[2px] items-end'><div className='w-1/2 bg-emerald-500/70 rounded-t' style={{height:`${r.focus}px`}} /><div className='w-1/2 bg-purple-500/70 rounded-t' style={{height:`${r.fatigue}px`}} /></div>)}</div><div className='mt-2 text-sm text-cyan-200'>Cognizant Stability Index: <span className='text-emerald-300 font-semibold'>{cognizantScore}%</span></div></div><div className='panel p-4 rounded-2xl'><h3 className='title'>ALARM CATEGORIES</h3><div className='mt-3 space-y-2'>{categories.map((c)=><div key={c.name} className='flex items-center gap-2 text-sm'><span className='w-3 h-3 rounded-full' style={{background:c.color}} />{c.name} {c.value}%</div>)}</div></div></section>
}
