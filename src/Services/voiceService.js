export const createSpeechRecognition = () => {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Ctor) return null
  const r = new Ctor()
  r.continuous = false
  r.interimResults = true
  r.lang = 'en-US'
  return r
}
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const rec = new SR(); rec.lang='en-US'; rec.continuous=false; rec.interimResults=false;
  return rec;
};
