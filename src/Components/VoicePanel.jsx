import { Mic } from 'lucide-react';
export default function VoicePanel({ listening, transcript, response, onListen }) {
  return <div className='glass rounded-xl p-4'><h3 className='font-semibold mb-2'>Voice Command Center</h3>
    <button onClick={onListen} className={`px-4 py-2 rounded-full ${listening?'bg-red-500 animate-pulse':'bg-cyan-500'} flex items-center gap-2`}><Mic size={16}/> {listening?'Listening':'Start Listening'}</button>
    <p className='mt-2 text-sm'>Transcript: {transcript || '—'}</p><p className='text-sm text-cyan-300'>AI: {response || 'Awaiting command...'}</p></div>;
}
