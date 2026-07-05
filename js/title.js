(function() {
  var normalTitle = document.title;
  var hiddenTitle = '喵呜~主人不要我了?';

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