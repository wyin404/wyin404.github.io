(function() {
  
  // ===== 1. 插入加载页 HTML =====
  var loaderHTML = `
    <div id="loader">
      <!-- GIF 作为全屏背景 -->
      <img class="loader-gif" src="/images/loading.gif" alt="加载中">
      
      <!-- 进度条区域：靠下 -->
      <div class="progress-wrapper">
        <div class="progress-container">
          <div class="progress">
            <div class="progress-fill" id="progressFill"></div>
          </div>
        </div>
        <div class="progress-text" id="progressText">0%</div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', loaderHTML);

  // ===== 2. 获取 DOM 元素 =====
  var progressFill = document.getElementById('progressFill');
  var progressText = document.getElementById('progressText');
  var loader = document.getElementById('loader');
  var wrap = document.getElementById('body-wrap');

  // ===== 3. 控制进度 =====
  var progress = 0;
  var isComplete = false;

  function updateProgress(value) {
    if (isComplete) return;
    var clamped = Math.min(value, 99);
    progress = clamped;
    progressFill.style.width = clamped + '%';
    progressText.textContent = Math.floor(clamped) + '%';
  }

  // ===== 4. 模拟真实进度 =====
  function simulateProgress() {
    if (document.readyState === 'loading') {
      updateProgress(progress + (Math.random() * 8 + 2));
      setTimeout(simulateProgress, 200);
    } else {
      updateProgress(70);
      startResourceLoading();
    }
  }

  function startResourceLoading() {
    var count = 0;
    var interval = setInterval(function() {
      count++;
      if (progress < 85) {
        updateProgress(progress + (Math.random() * 2 + 0.5));
      } else if (progress < 95) {
        updateProgress(progress + (Math.random() * 0.5 + 0.2));
      } else if (progress < 99) {
        updateProgress(progress + 0.1);
      } else {
        clearInterval(interval);
      }
      if (count > 50 && progress < 95) {
        updateProgress(95);
      }
    }, 200);
  }

  setTimeout(simulateProgress, 100);

  // ===== 5. 加载完成 =====
  window.addEventListener('load', function() {
    isComplete = true;
    progressFill.style.width = '100%';
    progressText.textContent = '100%';
    setTimeout(function() {
      if (loader) loader.classList.add('hidden');
      if (wrap) wrap.classList.add('show');
    }, 500);
  });

  // ===== 6. 容错 =====
  setTimeout(function() {
    if (loader && !loader.classList.contains('hidden')) {
      progressFill.style.width = '100%';
      progressText.textContent = '100%';
      setTimeout(function() {
        if (loader) loader.classList.add('hidden');
        if (wrap) wrap.classList.add('show');
      }, 300);
    }
  }, 15000);

})();