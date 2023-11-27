export const setTheme = (theme: 'light' | 'dark') => {
  document.cookie = `theme=${theme};path=/;`;
  if (theme === 'light') {
    document.querySelector('html')?.classList.remove('dark');
  } else {
    document.querySelector('html')?.classList.add('dark');
  }
}



if (typeof window !== 'undefined' && document !== undefined) {
  const preference =  window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  if (!document.cookie.includes('theme') && preference) {
    setTheme(preference);
  }
}
