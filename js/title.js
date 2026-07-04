(function() {
  var normalTitle = document.title;
  var hiddenTitle = '喵呜~主人~快回来呀~';

  document.addEventListener('visibilitychange', function() {
    document.title = document.hidden ? hiddenTitle : normalTitle;
  });

  window.addEventListener('blur', function() {
    document.title = hiddenTitle;
  });
  window.addEventListener('focus', function() {
    document.title = normalTitle;
  });
})();