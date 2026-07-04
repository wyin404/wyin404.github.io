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
    {
      src: "/images/p.jpg",
      alt: "p",
    },
    {
      src: "/images/q.jpg",
      alt: "q",
    },
    {
      src: "/images/r.jpg",
      alt: "r",
    },
    {
      src: "/images/s.jpg",
      alt: "s",
    },
    {
      src: "/images/t.jpg",
      alt: "t",
    },
    {
      src: "/images/u.jpg",
      alt: "u",
    },
    {
      src: "/images/v.jpg",
      alt: "v",
    },
    {
      src: "/images/w.jpg",
      alt: "w",
    },
    {
      src: "/images/x.jpg",
      alt: "x",
    },
    {
      src: "/images/y.jpg",
      alt: "y",
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

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    if (!isTransitioning && loadedImages[currentIndex]) {
      drawImageCover(loadedImages[currentIndex]);
    }
  }

  function drawImageCover(img, targetCtx, targetCanvas) {
    const c = targetCtx || ctx;
    const cvs = targetCanvas || canvas;
    const cw = cvs.width / devicePixelRatio;
    const ch = cvs.height / devicePixelRatio;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    const imgRatio = imgW / imgH;
    const canvasRatio = cw / ch;
    let sx, sy, sw, sh;

    if (imgRatio > canvasRatio) {
      sh = imgH;
      sw = sh * canvasRatio;
      sx = (imgW - sw) / 2;
      sy = 0;
    } else {
      sw = imgW;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (imgH - sh) / 2;
    }

    c.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

  function drawCoverRaw(img, targetCtx, w, h) {
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    const imgRatio = imgW / imgH;
    const canvasRatio = w / h;
    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = imgH;
      sw = sh * canvasRatio;
      sx = (imgW - sw) / 2;
      sy = 0;
    } else {
      sw = imgW;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (imgH - sh) / 2;
    }
    targetCtx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }

  // 波纹涟漪过渡效果
  function rippleTransition(fromImg, toImg, callback) {
    const cw = canvas.width / devicePixelRatio;
    const ch = canvas.height / devicePixelRatio;
    const pw = Math.floor(cw);
    const ph = Math.floor(ch);

    const cx = pw * (0.3 + Math.random() * 0.4);
    const cy = ph * (0.3 + Math.random() * 0.4);
    const maxDist = Math.sqrt(
      Math.max(cx, pw - cx) ** 2 + Math.max(cy, ph - cy) ** 2
    );

    const fromCanvas = document.createElement("canvas");
    fromCanvas.width = pw;
    fromCanvas.height = ph;
    const fromCtx = fromCanvas.getContext("2d");
    drawCoverRaw(fromImg, fromCtx, pw, ph);
    const fromData = fromCtx.getImageData(0, 0, pw, ph);

    const toCanvas = document.createElement("canvas");
    toCanvas.width = pw;
    toCanvas.height = ph;
    const toCtx = toCanvas.getContext("2d");
    drawCoverRaw(toImg, toCtx, pw, ph);
    const toData = toCtx.getImageData(0, 0, pw, ph);

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = pw;
    outputCanvas.height = ph;
    const outputCtx = outputCanvas.getContext("2d");
    const outputData = outputCtx.createImageData(pw, ph);

    const duration = 2200;
    const startTime = performance.now();

    const waveCount = 3;
    const waveWidth = 60;
    const waveAmplitude = 20;
    const step = 2;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const waveFront = eased * (maxDist + waveWidth * waveCount);

      const out = outputData.data;

      for (let y = 0; y < ph; y += step) {
        for (let x = 0; x < pw; x += step) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const relDist = waveFront - dist;

          let srcX = x;
          let srcY = y;
          let useNewImage = false;

          if (relDist > waveWidth * waveCount) {
            useNewImage = true;
          } else if (relDist > 0) {
            const wavePhase = (relDist / waveWidth) * Math.PI * 2;
            const amplitude = waveAmplitude * Math.sin(wavePhase) *
              Math.exp(-relDist / (waveWidth * waveCount) * 2);

            const angle = Math.atan2(dy, dx);
            srcX = x + Math.cos(angle) * amplitude;
            srcY = y + Math.sin(angle) * amplitude;

            useNewImage = relDist > waveWidth;
          }

          srcX = Math.max(0, Math.min(pw - 1, Math.round(srcX)));
          srcY = Math.max(0, Math.min(ph - 1, Math.round(srcY)));

          const srcIdx = (srcY * pw + srcX) * 4;
          const srcData = useNewImage ? toData : fromData;

          for (let dy2 = 0; dy2 < step && y + dy2 < ph; dy2++) {
            for (let dx2 = 0; dx2 < step && x + dx2 < pw; dx2++) {
              const outIdx = ((y + dy2) * pw + (x + dx2)) * 4;
              out[outIdx] = srcData.data[srcIdx];
              out[outIdx + 1] = srcData.data[srcIdx + 1];
              out[outIdx + 2] = srcData.data[srcIdx + 2];
              out[outIdx + 3] = 255;
            }
          }
        }
      }

      outputCtx.putImageData(outputData, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(outputCanvas, 0, 0, cw, ch);

      if (progress > 0.02 && progress < 0.95) {
        ctx.save();
        ctx.globalAlpha = 0.25 * (1 - Math.abs(progress - 0.4));

        for (let w = 0; w < waveCount; w++) {
          const ringDist = waveFront - w * waveWidth;
          if (ringDist > 0 && ringDist < maxDist) {
            ctx.beginPath();
            ctx.arc(cx, cy, ringDist, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(150, 200, 255, ${0.3 - w * 0.1})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      if (progress < 1) {
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

    rippleTransition(loadedImages[currentIndex], loadedImages[targetIndex], () => {
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
    autoPlayTimer = setInterval(next, 4500);
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
          gradient.addColorStop(0, `hsl(${200 + index * 20}, 60%, 20%)`);
          gradient.addColorStop(1, `hsl(${200 + index * 20}, 60%, 10%)`);
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

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const container = document.querySelector(".carousel-container");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prev();
      startAutoPlay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      next();
      startAutoPlay();
    });
  }
  if (container) {
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prev();
      startAutoPlay();
    }
    if (e.key === "ArrowRight") {
      next();
      startAutoPlay();
    }
  });

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopAutoPlay() : startAutoPlay();
  });

  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();