export const createSpeechRecognition = () => {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Ctor) return null
  const r = new Ctor()
  r.continuous = false
  r.interimResults = true
  r.lang = 'en-US'
  return r
}
