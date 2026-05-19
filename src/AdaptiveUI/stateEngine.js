export const adaptiveVisibility = (state) => ({
  showAll: state === 'Normal',
  dimNonEssential: state === 'Medium Stress',
  criticalOnly: state === 'Overload',
});
