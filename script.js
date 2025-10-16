(function() {
  'use strict';

  // Configurar fechas (zona local del visitante)
  // Inicio: 1 Oct a las 00:00
  // Fin: 22 Nov a las 18:00
  // No mostramos explícitamente estas fechas en la UI.
  const start = new Date(new Date().getFullYear(), 9, 1, 0, 0, 0, 0); // mes 9 = Octubre
  const end = new Date(new Date().getFullYear(), 10, 22, 18, 0, 0, 0);   // mes 10 = Noviembre

  const $days = document.getElementById('days');
  const $hours = document.getElementById('hours');
  const $minutes = document.getElementById('minutes');
  const $seconds = document.getElementById('seconds');
  const $fill = document.getElementById('progress-fill');
  const $pctText = document.getElementById('progress-text');
  const $bar = document.querySelector('.progress-bar');

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function formatCountdown(msRemaining) {
    if (msRemaining < 0) msRemaining = 0;
    const totalSeconds = Math.floor(msRemaining / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }

  function update() {
    const now = new Date();
    const remaining = end - now;
    const total = end - start;

    const { days, hours, minutes, seconds } = formatCountdown(remaining);
    $days.textContent = String(days);
    $hours.textContent = String(hours).padStart(2, '0');
    $minutes.textContent = String(minutes).padStart(2, '0');
    $seconds.textContent = String(seconds).padStart(2, '0');

    const progressed = clamp(((now - start) / total) * 100, 0, 100);
    const pct = Math.round(progressed * 10) / 10; // 1 decimal
    $fill.style.width = pct + '%';
    $pctText.textContent = pct.toFixed(1) + '%';
    $bar.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  update();
  setInterval(update, 1000);
})();

