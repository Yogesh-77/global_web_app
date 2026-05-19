import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header, SensorCard, AlarmCenter, VoicePanel, WebcamPanel, Analytics } from './Components/Panels'
import { useTelemetry } from './Hooks/useTelemetry'
import { initialAlarms } from './MockData/mockData'
import { createSpeechRecognition } from './Services/voiceService'

const commandResponses = {
  'show critical alarms': 'Displaying critical alarm stack.',
  'activate emergency mode': 'Emergency mode engaged.',
  'simplify dashboard': 'Adaptive UI switched to overload-safe mode.',
  'reset alarms': 'Alarm queue reset command sent.',
  'system status': 'System health 94%, AI confidence 91%.',
}

export default function App() {
  const sensors = useTelemetry()
  const [alarms, setAlarms] = useState(initialAlarms)
  const [emotion, setEmotion] = useState('Focused')
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [history, setHistory] = useState([])
  const [emergency, setEmergency] = useState(false)
  const state = emotion === 'Overloaded' ? 'OVERLOAD' : emotion === 'Stressed' ? 'STRESS' : 'NORMAL'

  useEffect(() => {
    if (alarms.some((a) => a.priority === 'Critical')) setEmergency(true)
  }, [alarms])

  const recognition = useMemo(() => createSpeechRecognition(), [])
  const toggleListening = () => {
    if (!recognition) return
    if (!listening) {
      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript.toLowerCase()
        setTranscript(text)
        setHistory((h) => [...h, `> ${text}`, commandResponses[text] || 'Command acknowledged.'])
        if (text.includes('emergency')) setEmergency(true)
        if (text.includes('reset')) setAlarms([])
      }
      recognition.start(); setListening(true)
      recognition.onend = () => setListening(false)
    } else recognition.stop()
  }

  const aiConfidence = Math.round(84 + Math.random() * 14)
  const health = Math.round(90 + Math.random() * 9)

  return (
    <div className={`min-h-screen cyber-bg grid-overlay p-4 md:p-6 ${emergency ? 'ring-4 ring-red-500/40' : ''}`}>
      <Header emergency={emergency} aiConfidence={aiConfidence} health={health} />
      {emergency && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='glass border-red-500/60 p-4 mt-4 text-center'><h2 className='text-2xl text-red-400 font-bold'>EMERGENCY FULLSCREEN MODE</h2><p>AI response: isolate Zone A, deploy coolant backup, initiate evacuation countdown: 120s.</p><button className='mt-2 px-4 py-2 bg-red-500/30 rounded' onClick={() => setEmergency(false)}>Acknowledge</button></motion.div>}
      <div className='grid xl:grid-cols-3 gap-4 mt-4'>
        <div className='xl:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-3'>{sensors.map((s) => <SensorCard key={s.name} s={s} />)}</div>
        <div className={`${state === 'OVERLOAD' ? 'opacity-60' : ''}`}><AlarmCenter alarms={state === 'OVERLOAD' ? alarms.filter((a) => a.priority === 'Critical') : alarms} setEmergency={setEmergency} setAlarms={setAlarms} /></div>
      </div>
      <div className='grid lg:grid-cols-3 gap-4 mt-4'>
        <VoicePanel listening={listening} transcript={transcript} history={history} onToggle={toggleListening} />
        <WebcamPanel emotion={emotion} setEmotion={setEmotion} />
        <div className='glass p-4'><h3 className='font-semibold'>AI Recommendation Engine</h3><ul className='text-sm mt-2 space-y-2'><li>Cooling efficiency dropped by 12%.</li><li>Motor failure probability: 87%.</li><li>Optimization: reduce load in Zone C by 9%.</li></ul><div className='text-xs mt-3 text-cyan-200'>Adaptive Mode: {state}</div></div>
      </div>
      <div className='mt-4'><Analytics data={[{ name: 'Critical', value: 5 }, { name: 'High', value: 8 }, { name: 'Medium', value: 13 }, { name: 'Low', value: 21 }]} /></div>
    </div>
  )
}
