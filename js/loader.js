!function(){document.body.insertAdjacentHTML("afterbegin",'\n    <div id="loader">\n      \x3c!-- GIF 作为全屏背景 --\x3e\n      <img class="loader-gif" src="/images/loading.gif" alt="加载中">\n      \n      \x3c!-- 进度条区域：靠下 --\x3e\n      <div class="progress-wrapper">\n        <div class="progress-container">\n          <div class="progress">\n            <div class="progress-fill" id="progressFill"></div>\n          </div>\n        </div>\n        <div class="progress-text" id="progressText">0%</div>\n      </div>\n    </div>\n  ');
// ===== 2. 获取 DOM 元素 =====
var t=document.getElementById("progressFill"),e=document.getElementById("progressText"),n=document.getElementById("loader"),s=document.getElementById("body-wrap"),d=0,i=!1;function o(n){if(!i){var s=Math.min(n,99);d=s,t.style.width=s+"%",e.textContent=Math.floor(s)+"%"}}
// ===== 4. 模拟真实进度 =====
setTimeout(function t(){var e,n;"loading"===document.readyState?(o(d+(8*Math.random()+2)),setTimeout(t,200)):(o(70),e=0,n=setInterval(function(){e++,d<85?o(d+(2*Math.random()+.5)):d<95?o(d+(.5*Math.random()+.2)):d<99?o(d+.1):clearInterval(n),e>50&&d<95&&o(95)},200))},100),
// ===== 5. 加载完成 =====
window.addEventListener("load",function(){i=!0,t.style.width="100%",e.textContent="100%",setTimeout(function(){n&&n.classList.add("hidden"),s&&s.classList.add("show")},500)}),
// ===== 6. 容错 =====
setTimeout(function(){n&&!n.classList.contains("hidden")&&(t.style.width="100%",e.textContent="100%",setTimeout(function(){n&&n.classList.add("hidden"),s&&s.classList.add("show")},300))},15e3)}();