// Entrance and scroll effects, started straight from the HTML rather than
// after React hydrates: the layout inlines this at the end of <body>, so
// elements reveal as soon as the page is parsed (same approach as the
// DoctorProject site). It defines window.__tpAnimScan(), which
// ScrollAnimations.tsx calls again after client-side navigations and
// ArticleBrowser calls after filters change. State lives in
// data-anim-state ("wait" -> "in" -> "done"), an attribute React never
// renders, so re-renders can't reset it. A MutationObserver also picks up
// [data-anim] nodes React creates later (client re-renders, filters, hot
// reload), and a timeout reveals anything still unscanned, so no element
// can stay hidden. CSS: "Motion system" in globals.css.
//
// Also handled here, from one passive scroll listener:
// - html[data-scrolled] / [data-scrolled-far] for the sticky header and back-to-top button
// - --read on <html> (0..1) for the reading progress bar over [data-reading]
// - [data-motion-scale="92"]: element grows from 92% to 100% as it reaches mid-screen
export const SCROLL_ANIMATION_SCRIPT = `(function(){
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) root.setAttribute('data-anim-on', '');
  // Reveals run in both scroll directions: an element that fully leaves the
  // screen is re-armed ("wait") and animates again when it comes back, from
  // the side it re-enters (data-anim-from="top" when scrolling up).
  // [data-anim-once] elements only animate the first time.
  var io = !reduce && 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var el = e.target;
          var state = el.getAttribute('data-anim-state');
          if (e.isIntersecting && e.intersectionRatio >= 0.12) {
            if (state !== 'wait') return;
            el.setAttribute('data-anim-from', e.boundingClientRect.top < 0 ? 'top' : 'bottom');
            el.setAttribute('data-anim-state', 'in');
            if (el.hasAttribute('data-anim-once')) io.unobserve(el);
            // Failsafe: finish even if animationend never arrives
            setTimeout(function () {
              if (el.getAttribute('data-anim-state') === 'in') el.setAttribute('data-anim-state', 'done');
            }, 4000);
          } else if (!e.isIntersecting && state !== 'wait') {
            el.setAttribute('data-anim-state', 'wait');
          }
        });
      }, { threshold: [0, 0.12] })
    : null;

  document.addEventListener('animationend', function (e) {
    var el = e.target;
    if (!el.getAttribute || e.animationName === 'tp-kenburns') return;
    // A wipe animates its children, so finish the frame around them
    if (e.animationName === 'tp-wipe' || e.animationName === 'tp-wipe-rev') el = el.parentElement;
    if (el && el.getAttribute('data-anim-state') === 'in') el.setAttribute('data-anim-state', 'done');
  }, true);

  var scaled = [];
  function collect() {
    scaled = Array.prototype.slice.call(document.querySelectorAll('[data-motion-scale]'));
    scaled.forEach(function (el) {
      if (el.__tpMotion) return;
      el.__tpMotion = true;
      el.style.transition = 'transform 200ms linear';
    });
  }

  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;
    if (y > 140) root.setAttribute('data-scrolled', ''); else root.removeAttribute('data-scrolled');
    if (y > 700) root.setAttribute('data-scrolled-far', ''); else root.removeAttribute('data-scrolled-far');

    var reading = document.querySelector('[data-reading]');
    if (reading) {
      var r = reading.getBoundingClientRect();
      var total = r.height - vh * 0.6;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      root.style.setProperty('--read', p.toFixed(4));
    }

    if (reduce) return;
    scaled.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var middle = r.top + r.height / 2;
      var pos = Math.min(100, Math.max(0, 100 - middle / vh * 100));
      var k = pos < 50 ? pos / 50 : 1;
      var s = parseFloat(el.getAttribute('data-motion-scale')) || 100;
      var sc = ((s + (100 - s) * k) / 100).toFixed(3);
      el.style.transform = 'scale3d(' + sc + ',' + sc + ',1)';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  window.__tpAnimScan = function () {
    document.querySelectorAll('[data-anim]:not([data-anim-state])').forEach(function (el) {
      if (io) { el.setAttribute('data-anim-state', 'wait'); io.observe(el); }
      else el.setAttribute('data-anim-state', 'done');
    });
    collect();
    onScroll();
  };
  window.__tpAnimScan();

  // [data-anim-children="fadeUp"] staggers every direct child, so prose and
  // list pages need no per-element markup. Runs only after React hydrates
  // (ScrollAnimations.tsx sets __tpHydrated), because tagging server HTML
  // before hydration would make React report attribute mismatches.
  window.__tpTagChildren = function () {
    document.querySelectorAll('[data-anim-children]').forEach(function (parent) {
      var kind = parent.getAttribute('data-anim-children') || 'fadeUp';
      var firstPass = !parent.__tpSeen;
      parent.__tpSeen = true;
      Array.prototype.forEach.call(parent.children, function (el, i) {
        if (el.hasAttribute('data-anim')) return;
        el.setAttribute('data-anim', kind);
        el.style.setProperty('--anim-delay', (i % 4) * 90 + 'ms');
        var r = el.getBoundingClientRect();
        // Already on screen at page load: leave it visible; it animates whenever
        // it re-enters. Children added later (search results, errors) animate in.
        if (firstPass && r.top < window.innerHeight && r.bottom > 0) {
          el.setAttribute('data-anim-state', 'done');
          if (io) io.observe(el);
        }
      });
    });
  };

  var queued = false;
  if ('MutationObserver' in window) {
    new MutationObserver(function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        if (window.__tpHydrated) window.__tpTagChildren();
        window.__tpAnimScan();
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  // Failsafe: never leave content hidden
  setTimeout(function () {
    document.querySelectorAll('[data-anim]:not([data-anim-state])').forEach(function (el) {
      el.setAttribute('data-anim-state', 'done');
    });
  }, 4000);
})();`;

declare global {
  interface Window {
    __tpAnimScan?: () => void;
    __tpTagChildren?: () => void;
    __tpHydrated?: boolean;
  }
}
