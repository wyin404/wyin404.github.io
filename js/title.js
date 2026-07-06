(function() {
  var normalTitle = document.title;
  var hiddenTitle = '喵呜~主人不要我了吗';
  var customText = 'nya~刚刚我好想主人'; // 可自定义这1秒内显示的文字

  var timer = null;

  function resetTitle() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    document.title = normalTitle;
  }

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // 页面被隐藏（切到后台）
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      document.title = hiddenTitle;
    } else {
      // 页面重新可见（但可能并未获得焦点）
      resetTitle();
    }
  });

  window.addEventListener('blur', function() {
    // 窗口失去焦点
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    document.title = hiddenTitle;
  });

  window.addEventListener('focus', function() {
    // 窗口获得焦点
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 先显示自定义文本
    document.title = customText;
    // 1秒后恢复为正常标题
    timer = setTimeout(function() {
      document.title = normalTitle;
      timer = null;
    }, 1500);
  });
})();
// 获取当前小时 (0-23)
const hour = new Date().getHours();
let greeting = '';

// 根据时间设定问候语
if (hour >= 5 && hour < 9) {
    greeting = '主人早！₍^ >ヮ<^₎ .ᐟ.ᐟ';
} else if (hour >= 9 && hour < 12) {
    greeting = '上午好主人~(^・ω・^ )';
} else if (hour >= 12 && hour < 14) {
    greeting = '主人午安！(=^-ω-^=)';
} else if (hour >= 14 && hour < 18) {
    greeting = '下午好主人~=ᗜωᗜ=';
} else if (hour >= 18 && hour < 24) {
    greeting = '主人晚安！(つω-｀)｡oO';
} else {
    greeting = '主人~都凌晨了注意休息哦';
}

// 修改页面标题，保留原站点名
const originalTitle = document.title;
document.title = `${greeting}`;