export const createSpeechRecognition = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const rec = new SR(); rec.lang='en-US'; rec.continuous=false; rec.interimResults=false;
  return rec;
};
