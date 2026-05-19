import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Components/Header';
import SensorCard from './Components/SensorCard';
import AlarmCenter from './Components/AlarmCenter';
import VoicePanel from './Components/VoicePanel';
import WebcamPanel from './Components/WebcamPanel';
import AnalyticsPanel from './Components/AnalyticsPanel';
import DigitalTwin from './Components/DigitalTwin';
import { useTelemetry } from './Hooks/useTelemetry';
import { initialAlarms, recommendations } from './MockData/mockData';
import { prioritize } from './AIEngine/prioritizer';
import { adaptiveVisibility } from './AdaptiveUI/stateEngine';
import { createSpeechRecognition } from './Services/voiceService';

export default function App() {
  const telemetry = useTelemetry();
  const [alarms, setAlarms] = useState(initialAlarms);
  const [filter, setFilter] = useState('All');
  const [cognitive, setCognitive] = useState('Normal');
  const [emotion, setEmotion] = useState('Focused');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [muted, setMuted] = useState(true);

  const ordered = useMemo(() => prioritize(alarms, filter), [alarms, filter]);
  const adaptive = adaptiveVisibility(cognitive);
  const aiConfidence = Math.round(ordered.reduce((a,c)=>a+c.aiConfidence,0)/ordered.length);
  const systemHealth = Math.round(telemetry.reduce((a,c)=>a+(100-c.val),0)/telemetry.length);

  const handleVoice = () => {
    const rec = createSpeechRecognition();
    if (!rec) return setAIResponse('Web Speech API unavailable in this browser.');
    setListening(true);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      const t = text.toLowerCase();
      if (t.includes('show critical')) setFilter('Critical');
      if (t.includes('activate emergency')) setEmergency(true);
      if (t.includes('simplify')) setCognitive('Overload');
      if (t.includes('reset alarms')) setFilter('All');
      if (t.includes('system status')) setAIResponse(`System health ${systemHealth}%.`); else setAIResponse(`Command executed: ${text}`);
    };
    rec.onend = () => setListening(false);
    rec.start();
  };

  return <div className={`cyber-grid min-h-screen p-4 ${emergency ? 'emergency-glow':''}`}>
    <div className='mx-auto max-w-[1700px] space-y-4'>
      <Header aiConfidence={aiConfidence} systemHealth={systemHealth} emergency={emergency} />
      <div className='glass rounded-xl p-3 flex flex-wrap items-center gap-3'>
        <span>Cognitive State:</span>{['Normal','Medium Stress','Overload'].map(s=><button key={s} onClick={()=>setCognitive(s)} className={`px-3 py-1 rounded ${cognitive===s?'bg-cyan-500 text-black':'bg-slate-800'}`}>{s}</button>)}
        <button onClick={()=>setEmergency(v=>!v)} className='ml-auto px-3 py-1 bg-red-600 rounded'>Emergency Mode</button>
        <button onClick={()=>setMuted(v=>!v)} className='px-3 py-1 bg-slate-700 rounded'>{muted?'Unmute':'Mute'} Audio</button>
      </div>
      <div className={`grid xl:grid-cols-4 md:grid-cols-2 gap-3 ${adaptive.dimNonEssential?'opacity-70':''}`}>{telemetry.map(s=><SensorCard key={s.name} sensor={s} />)}</div>
      <div className='grid xl:grid-cols-3 gap-4'>
        <div className='xl:col-span-2 space-y-4'>
          <AlarmCenter alarms={adaptive.criticalOnly?ordered.filter(a=>a.priority==='Critical'):ordered} setAlarms={setAlarms} filter={filter} setFilter={setFilter} />
          <AnalyticsPanel telemetry={telemetry} />
          {!adaptive.criticalOnly && <DigitalTwin alarms={ordered} />}
        </div>
        <div className='space-y-4'>
          <WebcamPanel emotion={emotion} setEmotion={setEmotion} />
          <VoicePanel listening={listening} transcript={transcript} response={aiResponse} onListen={handleVoice} />
          <div className='glass rounded-xl p-4'><h3 className='font-semibold'>AI Recommendation Engine</h3>{recommendations.map((r,i)=><motion.div key={i} layout className='mt-2 p-2 rounded bg-slate-900/70 border border-purple-400/30'>{r}</motion.div>)}</div>
        </div>
      </div>
    </div>
    <AnimatePresence>{emergency && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='fixed inset-0 bg-red-950/90 z-50 grid place-items-center p-5'>
      <div className='text-center border-2 border-red-500 p-8 rounded-xl bg-black/40'><h2 className='text-4xl text-red-400 font-bold animate-pulse'>EMERGENCY RESPONSE MODE</h2><p className='mt-4 text-lg'>Isolate Zone A • Trigger AI containment • Evacuate non-essential personnel.</p><p className='text-2xl mt-3'>Countdown: 00:45</p><button className='mt-4 px-4 py-2 bg-red-600 rounded' onClick={()=>setEmergency(false)}>Acknowledge</button></div>
    </motion.div>}</AnimatePresence>
  </div>;
}
