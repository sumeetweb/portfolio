(() => {
  const root = document.documentElement;
  const button = document.getElementById('lamp-pull');
  const status = document.getElementById('theme-status');
  if (!button) return;
  const lampElement = document.getElementById('theme-lamp');
  const fixture = lampElement.querySelector('.lamp-fixture');
  const cord = button.querySelector('.lamp-cord');
  const cordPath = cord.querySelector('path');
  const knob = button.querySelector('.lamp-knob');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let gesture = null;
  let suppressClickUntil = 0;
  let changing = false;
  const threshold = 24;
  const rope = { drop: 0, x: 0, dropVelocity: 0, xVelocity: 0 };
  let ropeFrame = 0;
  let lastFrame = 0;

  function drawCord(drop, sideways, phase) {
    const length = Math.max(54, 84 + drop);
    const tension = Math.min(1, Math.max(0, drop) / 110);
    const curl = (9 + Math.sin(phase) * 1.1) * (1 - tension * .6);
    const points = [
      [22, 0],
      [22 + curl + sideways * .2, length * .2],
      [22 - curl + sideways * .4, length * .4],
      [22 + curl * .85 + sideways * .65, length * .6],
      [22 - curl * .65 + sideways * .9, length * .8],
      [22 + sideways, length]
    ];
    const f = value => value.toFixed(2);
    let path = 'M22 0';
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)], p1 = points[i];
      const p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
      path += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    cordPath.setAttribute('d', path);
    cord.setAttribute('viewBox', `0 0 44 ${f(length + 2)}`);
    cord.style.height = `${length + 2}px`;
    knob.style.left = `${22 + sideways}px`;
    knob.style.top = `${length}px`;
    button.style.height = `${length + 30}px`;
  }

  function animateCord(time) {
    ropeFrame = 0;
    if (document.hidden || reduced.matches) return;
    const step = Math.min(2, (time - (lastFrame || time - 16)) / 16.67);
    lastFrame = time;
    const idleX = Math.sin(time / 1450) * 2.2;
    if (gesture) {
      rope.drop += (gesture.distance - rope.drop) * .6;
      rope.x += (gesture.sideways - rope.x) * .5;
      rope.dropVelocity = rope.xVelocity = 0;
    } else {
      rope.dropVelocity = (rope.dropVelocity - rope.drop * .085 * step) * Math.pow(.8, step);
      rope.xVelocity = (rope.xVelocity + (idleX - rope.x) * .07 * step) * Math.pow(.82, step);
      rope.drop += rope.dropVelocity * step;
      rope.x += rope.xVelocity * step;
    }
    drawCord(rope.drop, rope.x, time / 1100);
    ropeFrame = requestAnimationFrame(animateCord);
  }

  function startCord() {
    if (reduced.matches) { drawCord(gesture?.distance || 0, gesture?.sideways || 0, 0); return; }
    if (!ropeFrame && !document.hidden) { lastFrame = 0; ropeFrame = requestAnimationFrame(animateCord); }
  }

  function swing(strength = 1) {
    if (reduced.matches) return;
    fixture.getAnimations().filter(animation => !animation.animationName).forEach(animation => animation.cancel());
    fixture.animate(
      [0, -5, 3.5, -1.8, .7, 0].map(angle => ({ transform: `rotate(${angle * strength}deg)` })),
      { duration: 850, easing: 'ease-out' }
    );
  }

  function syncControl() {
    const dark = root.dataset.theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', `Pull the lamp chain to switch to ${dark ? 'light' : 'dark'} mode`);
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage may be unavailable. */ }
    syncControl();
    status.textContent = `${theme === 'light' ? 'Light' : 'Dark'} mode on`;
  }

  async function toggleTheme() {
    if (changing) return;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const lamp = document.getElementById('theme-lamp').getBoundingClientRect();
    root.style.setProperty('--lamp-x', `${lamp.left + lamp.width / 2}px`);
    root.style.setProperty('--lamp-y', `${lamp.top + 74}px`);
    if (reduced.matches) { setTheme(next); return; }
    changing = true;
    swing(1.2);
    button.setAttribute('aria-busy', 'true');
    root.classList.remove('theme-to-light', 'theme-to-dark');
    try {
      if (typeof document.startViewTransition === 'function') {
        const transition = document.startViewTransition(() => {
          setTheme(next);
          root.classList.add(`theme-to-${next}`);
        });
        await transition.finished;
      } else {
        root.classList.add('theme-fallback');
        root.classList.add(`theme-to-${next}`);
        setTheme(next);
        await new Promise(resolve => setTimeout(resolve, 700));
      }
    } catch {
      setTheme(next);
    } finally {
      root.classList.remove('theme-to-light', 'theme-to-dark', 'theme-fallback');
      changing = false;
      button.removeAttribute('aria-busy');
    }
  }

  function release(cancelled = false) {
    if (!gesture) return;
    const active = gesture;
    gesture = null;
    button.removeAttribute('data-dragging');
    button.removeAttribute('data-ready');
    lampElement.classList.remove('is-tugged');
    lampElement.style.setProperty('--tension', '0');
    button.style.setProperty('--pull', '0px');
    button.style.setProperty('--sway', '0px');
    if (reduced.matches) drawCord(0, 0, 0);
    if (button.hasPointerCapture(active.id)) button.releasePointerCapture(active.id);
    if (cancelled || active.activated || active.distance > 8) suppressClickUntil = performance.now() + 500;
    if (!cancelled && !active.activated && active.distance > 8) swing(.7);
  }

  button.addEventListener('pointerdown', event => {
    if (changing || (event.pointerType === 'mouse' && event.button !== 0)) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, distance: 0, sideways: 0, activated: false };
    button.setPointerCapture(event.pointerId);
    button.setAttribute('data-dragging', 'true');
    lampElement.classList.add('is-tugged');
    lampElement.dataset.targetTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  });
  button.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const pull = Math.max(0, event.clientY - gesture.y);
    gesture.distance = Math.min(62, pull <= threshold ? pull : threshold + (pull - threshold) * .25);
    gesture.sideways = Math.max(-14, Math.min(14, (event.clientX - gesture.x) * .65));
    button.style.setProperty('--pull', `${gesture.distance}px`);
    button.style.setProperty('--sway', `${Math.max(-10, Math.min(10, (event.clientX - gesture.x) * 0.3))}px`);
    lampElement.style.setProperty('--tension', String(gesture.distance / 62));
    lampElement.style.setProperty('--tug-angle', String(Math.max(-4, Math.min(4, (event.clientX - gesture.x) * .1))));
    if (!gesture.activated && pull >= threshold) {
      gesture.activated = true;
      button.setAttribute('data-ready', 'true');
      toggleTheme();
    }
    if (reduced.matches) drawCord(gesture.distance, gesture.sideways, 0);
  });
  button.addEventListener('pointerup', event => { if (gesture?.id === event.pointerId) release(); });
  button.addEventListener('pointercancel', () => release(true));
  button.addEventListener('lostpointercapture', () => release(true));
  button.addEventListener('click', event => {
    if (event.detail !== 0 && performance.now() < suppressClickUntil) return;
    toggleTheme();
  });
  window.addEventListener('blur', () => release(true));
  button.addEventListener('pointerenter', () => { if (!gesture && !changing) swing(.55); });
  document.addEventListener('visibilitychange', startCord);
  reduced.addEventListener('change', () => {
    if (ropeFrame) cancelAnimationFrame(ropeFrame);
    ropeFrame = 0;
    rope.drop = rope.x = rope.dropVelocity = rope.xVelocity = 0;
    startCord();
  });
  syncControl();
  startCord();
  const technologyDetail = document.getElementById('technology-detail');
  if (technologyDetail) {
    document.querySelectorAll('.technology-button').forEach(technology => {
      const showTechnology = () => {
        technologyDetail.textContent = `${technology.dataset.technology} · ${technology.dataset.group}`;
      };
      technology.addEventListener('pointerenter', showTechnology);
      technology.addEventListener('focus', showTechnology);
      technology.addEventListener('click', showTechnology);
    });
  }
})();
