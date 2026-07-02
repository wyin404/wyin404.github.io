(function() {
  var normalTitle = document.title;
  var hiddenTitle = '不许走要永远陪着我，我恨你，我爱你';

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