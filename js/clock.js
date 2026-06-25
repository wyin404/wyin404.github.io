!function(){"use strict";function e(e){return String(e).padStart(2,"0")}var t=["日","一","二","三","四","五","六"];function n(){var n=document.getElementById("clock-date"),o=document.getElementById("clock-time");if(n&&o){var d=new Date;n.textContent=d.getFullYear()+"年"+e(d.getMonth()+1)+"月"+e(d.getDate())+"日 星期"+t[d.getDay()],o.textContent=e(d.getHours())+":"+e(d.getMinutes())+":"+e(d.getSeconds())}}function o(){
// 移除旧时钟（避免重复）
var e=document.getElementById("clock-card");e&&e.remove();
// 创建容器
var t=document.createElement("div");t.classList.add("card-widget"),t.id="clock-card",t.style.cssText="padding: 15px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: #fff;",t.innerHTML='\n      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;" id="clock-date">----年--月--日 星期-</div>\n      <div style="font-size: 32px; font-weight: 700; font-family: \'Courier New\', monospace; letter-spacing: 3px; text-shadow: 0 2px 8px rgba(0,0,0,0.2);" id="clock-time">--:--:--</div>\n    ';var o=document.querySelector(".aside-content");o&&(o.insertBefore(t,o.firstChild),n(),window.clockInterval&&clearInterval(window.clockInterval),window.clockInterval=setInterval(n,1e3))}
// 页面首次加载
"loading"===document.readyState?document.addEventListener("DOMContentLoaded",o):o(),
// 🔑 关键：PJAX 切换后重新创建
document.addEventListener("pjax:complete",o)}();