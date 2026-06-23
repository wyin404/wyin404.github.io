(function() {
  // 插入加载页 HTML
  var loaderHTML = '<div id="loader"><img src="/images/loading.gif" alt="加载中"></div>';
  document.body.insertAdjacentHTML('afterbegin', loaderHTML);
  
  // 监听加载完成
  window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    var wrap = document.getElementById('body-wrap');
    if (loader) loader.classList.add('hidden');
    if (wrap) wrap.classList.add('show');
  });
})();