document.addEventListener('DOMContentLoaded', initRuntime)
document.addEventListener('pjax:complete', initRuntime) // 解决页面切换不更新[citation:6]

function initRuntime() {
  dayjs.extend(window.dayjs_plugin_duration)
  const el = document.getElementById('realtime_duration')
  if (!el) return

  // ⚠️ 重点：改成你自己的建站时间
  const startDate = dayjs('2026-06-16T00:00:00+08:00')

  const updateTime = () => {
    const dur = dayjs.duration(dayjs().diff(startDate))
    el.innerHTML = `网站已运维${Math.floor(dur.asDays())}天${dur.format('HH时mm分ss秒')}`
  }

  updateTime()
  setInterval(updateTime, 1000)
}