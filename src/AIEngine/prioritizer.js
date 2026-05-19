const weight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
export const prioritize = (alarms, filter = 'All') => alarms
  .filter(a => filter === 'All' || a.priority === filter)
  .sort((a,b)=>(weight[b.priority]-weight[a.priority]) || (b.aiConfidence-a.aiConfidence));
