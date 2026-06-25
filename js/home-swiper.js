(function () {
  const images = [
    {
      src: "/images/a.jpg",
      alt: "a",
    },
    {
      src: "/images/b.jpg",
      alt: "b",
    },
    {
      src: "/images/c.png",
      alt: "c",
    },
    {
      src: "/images/d.jpg",
      alt: "d",
    },
    {
      src: "/images/e.jpg",
      alt: "e",
    },
    {
      src: "/images/f.jpg",
      alt: "f",
    },
    {
      src: "/images/g.jpg",
      alt: "g",
    },
    {
      src: "/images/h.jpg",
      alt: "h",
    },
    {
      src: "/images/i.jpg",
      alt: "i",
    },
    {
      src: "/images/j.jpg",
      alt: "j",
    },
    {
      src: "/images/k.jpg",
      alt: "k",
    },
    {
      src: "/images/l.jpg",
      alt: "l",
    },
    {
      src: "/images/m.jpg",
      alt: "m",
    },
    {
      src: "/images/n.jpg",
      alt: "n",
    },
    {
      src: "/images/o.jpg",
      alt: "o",
    },
  ];

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const indicatorsEl = document.getElementById("indicators");

  let currentIndex = 0;
  let isTransitioning = false;
  let autoPlayTimer = null;
  let animationFrame = null;
  const loadedImages = [];
  const PIXEL_SIZE = 6;

  function resizeCanvas() {
    // 获取 .my-swiper-wrapper 的宽度
    const wrapper = document.querySelector('.my-swiper-wrapper');
    const container = document.querySelector('.carousel-container');
  
    if (!wrapper || !container) return;
  
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;
  
    // Canvas 宽度 = wrapper 宽度，高度 = container 高度
    canvas.width = wrapperWidth * devicePixelRatio;
    canvas.height = containerHeight * devicePixelRatio;
    canvas.style.width = wrapperWidth + 'px';
    canvas.style.height = containerHeight + 'px';
  
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    if (!isTransitioning && loadedImages[currentIndex]) {
      drawImageCover(loadedImages[currentIndex]);
    }
  }

  function drawImageCover(img, targetCtx) {
    const c = targetCtx || ctx;
    const cw = canvas.width / devicePixelRatio;
    const ch = canvas.height / devicePixelRatio;
    if (cw === 0 || ch === 0) return;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let sx, sy, sw, sh;

    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    c.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

  function getImagePixels(img) {
    const cw = canvas.width / devicePixelRatio;
    const ch = canvas.height / devicePixelRatio;
    const offscreen = document.createElement("canvas");
    offscreen.width = cw;
    offscreen.height = ch;
    const offCtx = offscreen.getContext("2d");

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let sx, sy, sw, sh;

    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    return offCtx.getImageData(0, 0, cw, ch);
  }

  function pixelRainTransition(fromImg, toImg, callback) {
    const cw = canvas.width / devicePixelRatio;
    const ch = canvas.height / devicePixelRatio;
    const cols = Math.ceil(cw / PIXEL_SIZE);
    const rows = Math.ceil(ch / PIXEL_SIZE);

    const fromPixels = getImagePixels(fromImg);
    const columnConfigs = [];
    for (let col = 0; col < cols; col++) {
      const centerDist = Math.abs(col - cols / 2) / (cols / 2);
      const waveDelay = centerDist * 0.3 + Math.random() * 0.15;
      columnConfigs.push({
        delay: waveDelay,
        speed: 0.8 + Math.random() * 0.6,
        trail: 3 + Math.floor(Math.random() * 5),
      });
    }

    const pixelStates = [];
    for (let row = 0; row < rows; row++) {
      pixelStates[row] = [];
      for (let col = 0; col < cols; col++) {
        const sx = Math.min(col * PIXEL_SIZE + PIXEL_SIZE / 2, cw - 1);
        const sy = Math.min(row * PIXEL_SIZE + PIXEL_SIZE / 2, ch - 1);
        const idx = (Math.floor(sy) * Math.floor(cw) + Math.floor(sx)) * 4;
        pixelStates[row][col] = {
          r: fromPixels.data[idx] || 0,
          g: fromPixels.data[idx + 1] || 0,
          b: fromPixels.data[idx + 2] || 0,
          fallen: false,
          y: row * PIXEL_SIZE,
          vy: 0,
          opacity: 1,
        };
      }
    }

    const duration = 2200;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      ctx.clearRect(0, 0, cw, ch);
      ctx.globalAlpha = Math.min(1, progress * 2);
      drawImageCover(toImg);
      ctx.globalAlpha = 1;
      let allFallen = true;

      for (let col = 0; col < cols; col++) {
        const config = columnConfigs[col];
        const colProgress = Math.max(0, (progress - config.delay) / (1 - config.delay));
        const dissolveFront = colProgress * (rows + config.trail);

        for (let row = 0; row < rows; row++) {
          const pixel = pixelStates[row][col];
          if (row < dissolveFront && !pixel.fallen) {
            pixel.fallen = true;
            pixel.vy = config.speed * 2;
          }
          if (pixel.fallen) {
            pixel.vy += 0.35 * config.speed;
            pixel.y += pixel.vy;
            const fallDist = pixel.y - row * PIXEL_SIZE;
            pixel.opacity = Math.max(0, 1 - fallDist / (ch * 0.7));
            if (pixel.y < ch + PIXEL_SIZE && pixel.opacity > 0.01) {
              allFallen = false;
              ctx.globalAlpha = pixel.opacity;
              ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
              ctx.fillRect(col * PIXEL_SIZE, pixel.y, PIXEL_SIZE - 0.5, PIXEL_SIZE - 0.5);
              if (pixel.opacity > 0.3 && pixel.vy > 3) {
                ctx.globalAlpha = pixel.opacity * 0.2;
                ctx.fillStyle = `rgb(${Math.min(255, pixel.r + 80)}, ${Math.min(255, pixel.g + 80)}, ${Math.min(255, pixel.b + 80)})`;
                for (let t = 1; t <= 2; t++) {
                  ctx.fillRect(col * PIXEL_SIZE, pixel.y - t * PIXEL_SIZE * 0.8, PIXEL_SIZE - 0.5, PIXEL_SIZE - 0.5);
                }
              }
            }
          } else {
            allFallen = false;
            ctx.globalAlpha = 1;
            ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
            ctx.fillRect(col * PIXEL_SIZE, pixel.y, PIXEL_SIZE - 0.5, PIXEL_SIZE - 0.5);
          }
        }
      }
      ctx.globalAlpha = 1;

      if (progress < 1 || !allFallen) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, cw, ch);
        drawImageCover(toImg);
        callback();
      }
    }
    animationFrame = requestAnimationFrame(animate);
  }

  function goTo(targetIndex) {
    if (isTransitioning || targetIndex === currentIndex) return;
    isTransitioning = true;
    const dots = indicatorsEl.querySelectorAll(".indicator");
    dots[currentIndex].classList.remove("active");
    dots[targetIndex].classList.add("active");
    pixelRainTransition(loadedImages[currentIndex], loadedImages[targetIndex], () => {
      currentIndex = targetIndex;
      isTransitioning = false;
    });
  }

  function next() {
    goTo((currentIndex + 1) % images.length);
  }

  function prev() {
    goTo((currentIndex - 1 + images.length) % images.length);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(next, 7500);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function preloadImages() {
    let loaded = 0;
    return new Promise((resolve) => {
      images.forEach((imgData, index) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          loadedImages[index] = img;
          loaded++;
          if (loaded === images.length) resolve();
        };
        img.onerror = () => {
          const placeholder = document.createElement("canvas");
          placeholder.width = 1920;
          placeholder.height = 1080;
          const pCtx = placeholder.getContext("2d");
          const gradient = pCtx.createLinearGradient(0, 0, 1920, 1080);
          gradient.addColorStop(0, `hsl(${index * 60 + 140}, 50%, 25%)`);
          gradient.addColorStop(1, `hsl(${index * 60 + 170}, 50%, 15%)`);
          pCtx.fillStyle = gradient;
          pCtx.fillRect(0, 0, 1920, 1080);
          pCtx.fillStyle = "#fff";
          pCtx.font = "48px sans-serif";
          pCtx.textAlign = "center";
          pCtx.fillText(imgData.alt, 960, 540);
          loadedImages[index] = placeholder;
          loaded++;
          if (loaded === images.length) resolve();
        };
        img.src = imgData.src;
      });
    });
  }

  async function init() {
    // 等待 DOM 完全渲染
    await new Promise((r) => setTimeout(r, 100));
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `indicator ${index === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goTo(index));
      indicatorsEl.appendChild(dot);
    });

    await preloadImages();
    drawImageCover(loadedImages[0]);
    startAutoPlay();
  }

  // 绑定按钮事件
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const container = document.querySelector(".carousel-container");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => { prev();
      startAutoPlay(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => { next();
      startAutoPlay(); });
  }
  if (container) {
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { prev();
      startAutoPlay(); }
    if (e.key === "ArrowRight") { next();
      startAutoPlay(); }
  });

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopAutoPlay() : startAutoPlay();
  });

  // 如果页面已加载完成则直接初始化，否则等 DOM 加载完
  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();