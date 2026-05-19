export const sensorConfig = [
  ['Temperature', '°C', 80, '#f97316'], ['Pressure', 'bar', 20, '#00d9ff'], ['Motor Load', '%', 100, '#ef4444'], ['Power', 'kW', 500, '#7c3aed'],
  ['Vibration', 'mm/s', 12, '#ef4444'], ['Cooling Efficiency', '%', 100, '#22c55e'], ['Voltage', 'V', 480, '#00d9ff'], ['Humidity', '%', 100, '#22c55e']
]

export const initialAlarms = [
  { id: 1, title: 'Reactor Cooling Drift', zone: 'Zone A', severity: 'Critical', priority: 'Critical', confidence: 96, action: 'Activate backup coolant manifold', ts: new Date().toLocaleTimeString() },
  { id: 2, title: 'Motor Bearing Wear', zone: 'Zone C', severity: 'High', priority: 'High', confidence: 88, action: 'Schedule bearing replacement', ts: new Date().toLocaleTimeString() },
  { id: 3, title: 'Humidity Instability', zone: 'Zone F', severity: 'Medium', priority: 'Medium', confidence: 74, action: 'Tune HVAC dampers', ts: new Date().toLocaleTimeString() },
]
