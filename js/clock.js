(function() {
  'use strict';

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  var weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  function updateClockDisplay() {
    var dateEl = document.getElementById('clock-date');
    var timeEl = document.getElementById('clock-time');
    if (!dateEl || !timeEl) return;

    var now = new Date();
    dateEl.textContent = now.getFullYear() + '年' + pad(now.getMonth() + 1) + '月' + pad(now.getDate()) + '日 星期' + weekDays[now.getDay()];
    timeEl.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
  }

  function createClock() {
    // 移除旧时钟（避免重复）
    var oldClock = document.getElementById('clock-card');
    if (oldClock) oldClock.remove();

    // 创建容器
    var container = document.createElement('div');
    container.classList.add('card-widget');
    container.id = 'clock-card';
    container.style.cssText = 'padding: 15px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: #fff;';

    container.innerHTML = `
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;" id="clock-date">----年--月--日 星期-</div>
      <div style="font-size: 32px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 3px; text-shadow: 0 2px 8px rgba(0,0,0,0.2);" id="clock-time">--:--:--</div>
    `;

    var sidebar = document.querySelector('.aside-content');
    if (sidebar) {
      sidebar.insertBefore(container, sidebar.firstChild);
      updateClockDisplay();
      if (window.clockInterval) clearInterval(window.clockInterval);
      window.clockInterval = setInterval(updateClockDisplay, 1000);
    }
  }

  // 页面首次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createClock);
  } else {
    createClock();
  }

  // 🔑 关键：PJAX 切换后重新创建
  document.addEventListener('pjax:complete', createClock);
})();