import { useEffect, useMemo, useState } from 'react'
import { TopHeader, SensorCard, AlarmCenter, EmotionVoicePanel, RightCharts } from './Components/PanelsNoDeps'
import { useTelemetry } from './Hooks/useTelemetry'
import { initialAlarms } from './MockData/mockData'
import { createSpeechRecognition } from './Services/voiceService'

const byPriority = { Critical: 0, High: 1, Medium: 2, Low: 3 }
const responses = {
  'show critical alarms': 'Filtering critical alarms only.',
  'activate emergency mode': 'Emergency mode activated.',
  'simplify dashboard': 'Switched to overload-safe compact mode.',
  'reset alarms': 'Alarms reset complete.',
  'system status': 'System stable. Monitoring at high confidence.',
  start: 'Voice listener started.',
  stop: 'Voice listener stopped.',
}

export default function App() {
  const sensors = useTelemetry()
  const [alarms, setAlarms] = useState(initialAlarms)
  const [emotion, setEmotion] = useState('Normal')
  const [transcript, setTranscript] = useState('')
  const [history, setHistory] = useState([])
  const [listening, setListening] = useState(false)
  const [emergency, setEmergency] = useState(false)
  const [aiResponse, setAiResponse] = useState('Awaiting operator input.')
  const recognition = useMemo(() => createSpeechRecognition(), [])

  const state = emotion === 'Overloaded' ? 'OVERLOAD' : emotion === 'Stressed' ? 'STRESS' : 'NORMAL'
  const sortedAlarms = [...alarms].sort((a, b) => byPriority[a.priority] - byPriority[b.priority])
  const criticalCount = alarms.filter((a) => a.priority === 'Critical').length
  const emotionConfidence = Math.round(71 + Math.random() * 25)

  useEffect(() => setEmergency(criticalCount > 0), [criticalCount])

  const executeCommand = (raw) => {
    const text = raw.toLowerCase().trim()
    setTranscript(text)
    if (text.includes('show critical')) setAlarms((prev) => prev.filter((a) => a.priority === 'Critical'))
    if (text.includes('activate emergency')) setEmergency(true)
    if (text.includes('simplify')) setEmotion('Overloaded')
    if (text.includes('reset alarms')) setAlarms(initialAlarms)
    const response = Object.entries(responses).find(([key]) => text.includes(key))?.[1] || 'Command received.'
    setAiResponse(response)
    setHistory((h) => [...h.slice(-7), `CMD: ${text}`, `AI: ${response}`])
  }

  const startVoice = () => {
    if (!recognition) return
    recognition.onresult = (e) => executeCommand(e.results[0][0].transcript)
    recognition.onend = () => setListening(false)
    recognition.start()
    setListening(true)
  }
  const stopVoice = () => { recognition?.stop(); setListening(false); executeCommand('stop') }

  const alarmFreq = [
    { hour: '08:00', Critical: 2, High: 4, Medium: 5, Low: 7 },
    { hour: '09:00', Critical: 1, High: 3, Medium: 4, Low: 6 },
    { hour: '10:00', Critical: 1, High: 3, Medium: 6, Low: 5 },
    { hour: '11:00', Critical: 3, High: 5, Medium: 4, Low: 5 },
    { hour: '12:00', Critical: 3, High: 4, Medium: 4, Low: 6 },
    { hour: '13:00', Critical: 2, High: 5, Medium: 5, Low: 7 },
    { hour: '14:00', Critical: 2, High: 5, Medium: 3, Low: 7 },
  ]

  const cognitiveTrend = [
    { t: '08:00', focus: 72, fatigue: 20 },
    { t: '09:00', focus: 78, fatigue: 23 },
    { t: '10:00', focus: 75, fatigue: 26 },
    { t: '11:00', focus: 83, fatigue: 21 },
    { t: '12:00', focus: 86, fatigue: 18 },
    { t: '13:00', focus: 81, fatigue: 24 },
    { t: '14:00', focus: 88, fatigue: 16 },
  ]

  const cognizantScore = Math.round((cognitiveTrend.reduce((a, c) => a + c.focus, 0) / cognitiveTrend.length) - (cognitiveTrend.reduce((a, c) => a + c.fatigue, 0) / cognitiveTrend.length) * 0.3)

  return (
    <div className={`min-h-screen text-slate-100 app-bg ${emergency ? 'emergency-glow' : ''}`}>
      <TopHeader aiConfidence={89} sysHealth={76} criticalCount={criticalCount} />
      <main className='max-w-[1400px] mx-auto p-4 md:p-6 space-y-4'>
        {emergency && <div className='panel border-red-500 text-red-300 p-3 rounded-xl'>EMERGENCY MODE ACTIVE • Follow action protocol immediately.</div>}
        <section className='grid md:grid-cols-2 xl:grid-cols-4 gap-3'>{sensors.map((s) => <SensorCard key={s.name} s={s} />)}</section>
        <section className='grid xl:grid-cols-3 gap-4'>
          <div className='xl:col-span-2'><AlarmCenter alarms={state === 'OVERLOAD' ? sortedAlarms.filter((a) => a.priority === 'Critical') : sortedAlarms} onPriorityChange={(id, priority) => setAlarms((prev) => prev.map((a) => a.id === id ? { ...a, priority } : a))} /></div>
          <RightCharts alarmFreq={alarmFreq} cognitiveTrend={cognitiveTrend} cognizantScore={cognizantScore} categories={[{ name: 'Mechanical', value: 34, color: '#f97316' }, { name: 'Electrical', value: 26, color: '#3b82f6' }, { name: 'Thermal', value: 22, color: '#ec4899' }, { name: 'Software', value: 18, color: '#a855f7' }]} />
        </section>
        <EmotionVoicePanel emotion={emotion} setEmotion={setEmotion} emotionConfidence={emotionConfidence} transcript={transcript} history={history} listening={listening} onStartVoice={startVoice} onStopVoice={stopVoice} aiResponse={aiResponse} />
      </main>
    </div>
  )
}
