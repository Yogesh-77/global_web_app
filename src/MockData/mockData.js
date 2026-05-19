export const sensorConfig = [
  ['Temperature', '°C', 100, '#f97316', 74],
  ['Pressure', 'bar', 10, '#3b82f6', 3.4],
  ['Motor Load', '%', 100, '#a855f7', 78],
  ['Vibration', 'mm/s', 4, '#ec4899', 1.75],
  ['Power Consumption', 'kW', 250, '#eab308', 144],
  ['Cooling Efficiency', '%', 100, '#22c55e', 89],
  ['Voltage', 'V', 480, '#06b6d4', 443],
  ['Humidity', '%', 100, '#14b8a6', 41],
]

export const initialAlarms = [
  { id: 1, title: 'Motor Overheating', zone: 'Zone A', severity: 'Critical', priority: 'Critical', confidence: 97, action: 'Reduce Motor Load Immediately', ts: '14:32:01' },
  { id: 2, title: 'Pressure Spike - Reactor 3', zone: 'Zone B', severity: 'High', priority: 'High', confidence: 91, action: 'Open Relief Valve P-7', ts: '14:31:45' },
  { id: 3, title: 'Vibration Anomaly - Pump 2', zone: 'Zone C', severity: 'High', priority: 'High', confidence: 89, action: 'Inspect Bearing Assembly', ts: '14:30:10' },
  { id: 4, title: 'Power Surge - Line 4', zone: 'Zone A', severity: 'Medium', priority: 'Medium', confidence: 78, action: 'Check Circuit Breaker CB-4', ts: '14:29:55' },
  { id: 5, title: 'Coolant Level Low', zone: 'Zone D', severity: 'Medium', priority: 'Medium', confidence: 75, action: 'Refill Coolant Tank T-2', ts: '14:28:30' },
  { id: 6, title: 'Fan Speed Deviation', zone: 'Zone B', severity: 'Low', priority: 'Low', confidence: 67, action: 'Check Fan Belt & Speed', ts: '14:27:12' },
]
export const sensorSeed = [
  ['Temperature','°C',88,70,100],['Pressure','bar',71,50,90],['Motor Load','%',62,40,95],['Power','kW',76,45,100],
  ['Vibration','mm/s',58,30,80],['Cooling Eff.','%',67,60,100],['Voltage','V',83,60,100],['Humidity','%',52,20,80],
];

export const initialAlarms = [
  {id:1,title:'Coolant loop anomaly',zone:'Zone A',severity:'Critical',priority:'Critical',aiConfidence:97,recommended:'Initiate coolant bypass'},
  {id:2,title:'Bearing vibration spike',zone:'Zone C',severity:'High',priority:'High',aiConfidence:91,recommended:'Reduce motor RPM 15%'},
  {id:3,title:'Power factor drift',zone:'Zone D',severity:'Medium',priority:'Medium',aiConfidence:84,recommended:'Enable capacitor bank'},
];

export const recommendations = [
  'Cooling efficiency dropped by 12%.',
  'Motor failure probability: 87%.',
  'Humidity trending above tolerance in Zone B.',
];
