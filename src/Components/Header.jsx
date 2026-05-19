import { Bot, AlertTriangle, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ aiConfidence, systemHealth, emergency }) {
  return <header className='glass relative overflow-hidden rounded-2xl p-4 shadow-neon'>
    <motion.div className='absolute left-0 right-0 h-1 bg-cyan-300/40 animate-scan' />
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex items-center gap-3'><Bot className='text-neonBlue animate-pulseFast'/><h1 className='text-xl font-semibold'>Cognitive-Aware AI Alarm Prioritization & Adaptive HMI System</h1></div>
      <div className='flex gap-4 text-sm'>
        <span>AI Confidence {aiConfidence}%</span><span>System Health {systemHealth}%</span><span>{new Date().toLocaleString()}</span>
        <span className='flex items-center gap-1'><Wifi size={14}/>Connected</span>
        <span className={emergency ? 'text-red-400':'text-emerald-400'}><AlertTriangle className='inline mr-1' size={14}/>{emergency?'Emergency':'Stable'}</span>
      </div>
    </div>
  </header>;
}
