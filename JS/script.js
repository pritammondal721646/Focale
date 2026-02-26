const counters = document.querySelectorAll(".counter-number");

function animateCounter(counter) {
  const target = +counter.dataset.target;
  const duration = 2200;
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    const currentValue = Math.floor(target * easedProgress);
    counter.textContent = formatNumber(currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = formatNumber(target);
    }
  }

  requestAnimationFrame(update);
}

function formatNumber(value) {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M+";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K+";
  } else {
    return value;
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 },
);

counters.forEach((counter) => observer.observe(counter));
