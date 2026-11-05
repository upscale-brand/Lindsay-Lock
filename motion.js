(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hero = document.querySelector(".sp-hero");
  if (hero && !reduce) requestAnimationFrame(function () { hero.classList.add("hero-ready"); });
  var sections = document.querySelectorAll("[data-motion-section]");
  if (reduce || !("IntersectionObserver" in window)) {
    sections.forEach(function (section) { section.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    sections.forEach(function (section) { observer.observe(section); });
  }
  var progress = document.querySelector(".scroll-progress span");
  if (progress) {
    var ticking = false;
    function updateProgress() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); } }, { passive: true });
    updateProgress();
  }
})();
