// ===== 字体切换功能（两种字体） =====
!function(){"use strict";
// 1. 获取保存的字体偏好
let t=localStorage.getItem("butterfly_font")||"custom";
// 2. 字体映射表
const e={default:'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',custom:"'圆滑',serif"};
// 3. 应用字体到页面
function n(n){
// 设置 CSS 变量
document.documentElement.style.setProperty("--font-family",e[n]||e.default),
// 如果主题使用 body 直接设置，也加上
document.body.style.fontFamily=e[n]||e.default,
// 保存到本地
localStorage.setItem("butterfly_font",n),t=n,
// 更新面板选中状态
document.querySelectorAll(".font-option").forEach(function(t){t.dataset.font===n?t.classList.add("active"):t.classList.remove("active")})}
// 4. 切换面板显示/隐藏
// 5. 设置字体（全局函数，供 onclick 调用）
window.setFont=function(t){n(t);
// 选择后自动关闭面板
var e=document.getElementById("font-panel");e&&(e.style.display="none")},
// 6. 绑定按钮点击事件
document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("font-toggle-btn");e&&e.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),function(){var t=document.getElementById("font-panel");if(t){var e="none"===t.style.display||""===t.style.display;t.style.display=e?"block":"none"}}()}),
// 点击面板外部关闭
document.addEventListener("click",function(t){var e=document.getElementById("font-panel"),n=document.getElementById("font-toggle-btn");e&&"block"===e.style.display&&(e.contains(t.target)||n.contains(t.target)||(e.style.display="none"))}),
// 初始化字体
n(t)})}();