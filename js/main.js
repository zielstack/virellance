/**
 * VIRELLANCE MEDICAL TECHNOLOGIES — Master Architectural Client Interactions
 * Dignified, clean, and purposeful interactions (zero decorative AI gimmicks)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMasthead();
  initHeroVideos();
  initHeroAmbientCanvas();
  initWorkbench();
  initDossierModal();
  initBackToTop();
});

/* ==========================================================================
   1. Masthead & Scroll Spy
   ========================================================================== */
function initMasthead() {
  const masthead = document.querySelector('.site-masthead');
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const navMenu = document.querySelector('.masthead-nav');
  const navLinks = document.querySelectorAll('.masthead-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      masthead.classList.add('scrolled');
    } else {
      masthead.classList.remove('scrolled');
    }
    updateScrollSpy();
  }, { passive: true });

  // Initial active state update on page load
  updateScrollSpy();

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !masthead.contains(e.target)) {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function updateScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const activeLink = document.querySelector(`.masthead-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
}

/* ==========================================================================
   2. Bioprocess Workbench Interactive Tabs
   ========================================================================== */
function initWorkbench() {
  const tabBtns = document.querySelectorAll('.workbench-tab-btn, .toc-tab-btn');
  const panels = document.querySelectorAll('.workbench-panel, .console-pane-body');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. Executive Curriculum Vitae / Dossier Modal
   ========================================================================== */
function initDossierModal() {
  const allModals = document.querySelectorAll('.modal-overlay');
  const allCloseBtns = document.querySelectorAll('.modal-close-trigger');
  const openBritneyBtn = document.getElementById('open-dossier-btn');
  const britneyModal = document.getElementById('executive-dossier-modal');
  const tabBtns = document.querySelectorAll('.modal-tab-btn, .dossier-tab-btn');
  const tabArticles = document.querySelectorAll('.tab-pane-content, .dossier-article-tab');
  const modalTriggers = document.querySelectorAll('[data-modal-target]');

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    allModals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }

  // Britney modal open trigger
  if (openBritneyBtn && britneyModal) {
    openBritneyBtn.addEventListener('click', () => openModal(britneyModal));
  }

  // Advisor modal triggers (cards and buttons)
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = trigger.getAttribute('data-modal-target');
      if (targetId) {
        const targetModal = document.getElementById(targetId);
        if (targetModal) openModal(targetModal);
      }
    });

    // Keyboard accessibility for card triggers
    if (trigger.getAttribute('role') === 'button') {
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const targetId = trigger.getAttribute('data-modal-target');
          if (targetId) {
            const targetModal = document.getElementById(targetId);
            if (targetModal) openModal(targetModal);
          }
        }
      });
    }
  });

  // All close buttons (&times;)
  allCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllModals();
    });
  });

  // Backdrop click to close
  allModals.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Escape key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Tab switching in Britney modal
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabArticles.forEach(article => article.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(target);
      if (activeContent) activeContent.classList.add('active');
    });
  });
}

/* ==========================================================================
   5. Back to Top Trigger
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top') || document.getElementById('back-to-masthead');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   6. Hero Ambient Biological Motion & Video Fallback
   ========================================================================== */
function initHeroAmbientCanvas() {
  const canvas = document.getElementById('hero-ambient-canvas');
  const heroSection = document.getElementById('hero');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let isVisible = true;

  function resize() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Microscopic biological commensal nodes
  const nodes = [];
  const count = Math.min(28, Math.max(16, Math.floor(window.innerWidth / 60)));
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(112, 197, 193,' : 'rgba(22, 140, 145,'
    });
  }

  function draw() {
    if (!isVisible) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connecting precision medical filaments between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(112, 197, 193, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw biological nodes with subtle bioluminescent halo
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0) n.x = canvas.width;
      if (n.x > canvas.width) n.x = 0;
      if (n.y < 0) n.y = canvas.height;
      if (n.y > canvas.height) n.y = 0;

      // Glow halo
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `${n.color} 0.06)`;
      ctx.fill();

      // Core particle
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${n.color} ${n.alpha})`;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  // Intersection Observer to pause when hero is off-screen (saves battery & CPU)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          draw();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  } else {
    draw();
  }
}

/* ==========================================================================
   7. Hero Background & Panoramic Video Initialization & Refresh Resilience
   ========================================================================== */
function initHeroVideos() {
  const videos = [
    document.getElementById('hero-bg-video'),
    document.getElementById('panoramic-hero-video')
  ].filter(Boolean);

  if (!videos.length) return;

  function configureAndPlay(video) {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.then(() => {
          video.classList.add('playing');
        }).catch(() => {
          // Autoplay policy prevented playback on refresh:
          // Clean poster image remains visible with zero distortion.
          // Resumes seamlessly upon first user interaction.
          const resumeOnInteraction = () => {
            video.play().catch(() => {});
            ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
              window.removeEventListener(evt, resumeOnInteraction);
            });
          };
          ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
            window.addEventListener(evt, resumeOnInteraction, { once: true, passive: true });
          });
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
      video.addEventListener('canplay', tryPlay, { once: true });
    }
  }

  videos.forEach(configureAndPlay);

  // Resume when returning to tab/page
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      videos.forEach(v => {
        if (v && v.paused) v.play().catch(() => {});
      });
    }
  });

  // Handle browser bfcache restore (back/forward or refresh restoration)
  window.addEventListener('pageshow', () => {
    videos.forEach(v => {
      if (v && v.paused) v.play().catch(() => {});
    });
  });
}
