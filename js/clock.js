(function() {
  'use strict';

  // ---------- 创建HTML容器 ----------
  var container = document.createElement('div');
  container.classList.add('card-widget');
  container.id = 'clock-card';

  var content = document.createElement('div');
  content.className = 'card-content';

  var display = document.createElement('div');
  display.id = 'clock-display';

  var dateEl = document.createElement('div');
  dateEl.id = 'clock-date';
  var timeEl = document.createElement('div');
  timeEl.id = 'clock-time';

  display.appendChild(dateEl);
  display.appendChild(timeEl);
  content.appendChild(display);
  container.appendChild(content);

  // ---------- 插入到侧边栏（改进版） ----------
  function insertClock() {
    var sidebar = document.querySelector('.aside-content');
    if (sidebar) {
      sidebar.insertBefore(container, sidebar.firstChild);
      return true;
    }
    return false;
  }

  // ---------- 时钟更新逻辑 ----------
  var weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  function updateClock() {
    var dateDisplay = document.getElementById('clock-date');
    var timeDisplay = document.getElementById('clock-time');
    if (!dateDisplay || !timeDisplay) return;

    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    var week = weekDays[now.getDay()];
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var seconds = String(now.getSeconds()).padStart(2, '0');

    dateDisplay.textContent = year + '-' + month + '-' + day + ' 星期' + week;
    timeDisplay.textContent = hours + ':' + minutes + ':' + seconds;
  }

  // ---------- 核心：插入 + 启动 ----------
  function initClock() {
    // 如果插入成功，直接启动
    if (insertClock()) {
      updateClock();
      setInterval(updateClock, 1000);
      return;
    }

    // 插入失败 → 用 MutationObserver 监听侧边栏出现
    var observer = new MutationObserver(function() {
      if (insertClock()) {
        updateClock();
        setInterval(updateClock, 1000);
        observer.disconnect(); // 成功后停止监听
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 保险：3秒后如果还没成功，强制再试一次
    setTimeout(function() {
      if (!document.getElementById('clock-card')) {
        insertClock();
        updateClock();
        setInterval(updateClock, 1000);
      }
    }, 3000);
  }

  // 启动
  initClock();

})();