(function () {
  'use strict';

  var THEME_KEY = 'sn-theme';
  var toggleBtn = document.getElementById('theme-toggle');

  function setToggleLabel(theme) {
    if (toggleBtn) {
      toggleBtn.textContent = theme === 'dark' ? 'light' : 'dark';
    }
  }

  function setGiscusTheme(theme) {
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      'https://giscus.app'
    );
  }

  function applyTheme(theme, persist) {
    document.documentElement.dataset.theme = theme;
    setToggleLabel(theme);
    setGiscusTheme(theme);
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
  }

  function initTheme() {
    var t = null;
    try { t = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (t !== 'light' && t !== 'dark') {
      t = (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    applyTheme(t, false);
  }

  function toggleTheme() {
    var current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  initTheme();
})();
