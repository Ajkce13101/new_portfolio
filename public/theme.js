// Apply the saved or system theme before rendering to avoid a light-mode flash.
(() => {
  let preference;
  try { preference = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be disabled. */ }
  const saved = preference === 'light' || preference === 'dark';
  document.documentElement.dataset.theme = saved
    ? preference
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.themePreference = saved ? 'saved' : 'system';
})();
