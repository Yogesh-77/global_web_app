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
