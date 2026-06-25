// ===== 字体切换功能（两种字体） =====
(function() {
  'use strict';

  // 1. 获取保存的字体偏好
  let currentFont = localStorage.getItem('butterfly_font') || 'custom';

  // 2. 字体映射表
  const fontMap = {
    default: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    custom: "'圆滑',serif"
  };

  // 3. 应用字体到页面
  function applyFont(fontValue) {
    // 设置 CSS 变量
    document.documentElement.style.setProperty('--font-family', fontMap[fontValue] || fontMap.default);
    
    // 如果主题使用 body 直接设置，也加上
    document.body.style.fontFamily = fontMap[fontValue] || fontMap.default;
    
    // 保存到本地
    localStorage.setItem('butterfly_font', fontValue);
    currentFont = fontValue;

    // 更新面板选中状态
    document.querySelectorAll('.font-option').forEach(function(el) {
      if (el.dataset.font === fontValue) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // 4. 切换面板显示/隐藏
  function toggleFontPanel() {
    var panel = document.getElementById('font-panel');
    if (panel) {
      var isHidden = panel.style.display === 'none' || panel.style.display === '';
      panel.style.display = isHidden ? 'block' : 'none';
    }
  }

  // 5. 设置字体（全局函数，供 onclick 调用）
  window.setFont = function(fontValue) {
    applyFont(fontValue);
    // 选择后自动关闭面板
    var panel = document.getElementById('font-panel');
    if (panel) {
      panel.style.display = 'none';
    }
  };

  // 6. 绑定按钮点击事件
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('font-toggle-btn');
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFontPanel();
      });
    }

    // 点击面板外部关闭
    document.addEventListener('click', function(e) {
      var panel = document.getElementById('font-panel');
      var btn = document.getElementById('font-toggle-btn');
      if (panel && panel.style.display === 'block') {
        if (!panel.contains(e.target) && !btn.contains(e.target)) {
          panel.style.display = 'none';
        }
      }
    });

    // 初始化字体
    applyFont(currentFont);
  });

})();