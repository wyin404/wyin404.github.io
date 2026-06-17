(function() {
  'use strict';

  // ---------- 创建HTML容器（使用更安全的方式） ----------
  var container = document.createElement('div');
  // 用 classList.add 替代 className 赋值，避免空值问题
  container.classList.add('card-widget');
  container.id = 'clock-card';

  // 创建内部结构
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

  // ---------- 插入到侧边栏 ----------
  function insertClock() {
    var sidebar = document.querySelector('.aside-content');
    if (sidebar) {
      // 插入到第一个子元素之前
      sidebar.insertBefore(container, sidebar.firstChild);
      return true;
    }
    return false;
  }

  if (!insertClock()) {
    // 如果侧边栏还没加载，等DOM加载完再试
    document.addEventListener('DOMContentLoaded', function() {
      if (!insertClock()) {
        // 实在找不到侧边栏，就追加到 body（兜底）
        document.body.appendChild(container);
      }
    });
  }

  // ---------- 时钟更新逻辑 ----------
  var dateDisplay = document.getElementById('clock-date');
  var timeDisplay = document.getElementById('clock-time');
  var weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  function updateClock() {
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

  // 初始更新
  updateClock();
  // 每秒更新
  setInterval(updateClock, 1000);

})();