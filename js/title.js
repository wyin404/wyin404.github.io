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
    }, 1000);
  });
})();