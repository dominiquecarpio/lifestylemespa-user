const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('s', window.scrollY > 70));

    // ── iOS Video Autoplay Fix ──
    (function initHeroVideo() {
      const videoEl = document.querySelector('.hvb-vid');
      if (!videoEl) return;
      
      // Function to attempt video playback
      const attemptPlay = () => {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Autoplay likely failed, but video will play on user interaction
            console.log('Autoplay prevented:', error);
          });
        }
      };
      
      // Try to play immediately
      attemptPlay();
      
      // Also try after a short delay
      setTimeout(attemptPlay, 500);
      
      // On first user interaction, ensure video is playing
      const playOnInteraction = () => {
        attemptPlay();
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('click', playOnInteraction);
      };
      document.addEventListener('touchstart', playOnInteraction, { once: true });
      document.addEventListener('click', playOnInteraction, { once: true });
    })();


    document.getElementById('ham').addEventListener('click', () => {
      const mob = document.getElementById('mob');
      const ham = document.getElementById('ham');
      const overlay = document.getElementById('mobOverlay');
      const isOpen = mob.classList.toggle('open');
      ham.classList.toggle('active');
      if (overlay) { overlay.classList.toggle('visible', isOpen); overlay.setAttribute('aria-hidden', !isOpen); }
      ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // iOS scroll lock
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    function cm() {
      const mob = document.getElementById('mob');
      const ham = document.getElementById('ham');
      const overlay = document.getElementById('mobOverlay');
      const mobDropdown = document.getElementById('mobDropdown');
      const mobDropdownBtn = document.getElementById('mobDropdownBtn');
      const mobDropdownContent = document.getElementById('mobDropdownContent');
      mob.classList.remove('open');
      ham.classList.remove('active');
      if (mobDropdown) { mobDropdown.classList.remove('open'); }
      if (mobDropdownBtn) { mobDropdownBtn.setAttribute('aria-expanded', 'false'); }
      if (mobDropdownContent) { mobDropdownContent.setAttribute('aria-hidden', 'true'); }
      if (overlay) { overlay.classList.remove('visible'); overlay.setAttribute('aria-hidden', 'true'); }
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    // Mobile "More" dropdown in mobile menu
    const mobDropdownBtn = document.getElementById('mobDropdownBtn');
    const mobDropdownContent = document.getElementById('mobDropdownContent');
    const mobDropdown = document.getElementById('mobDropdown');
    if (mobDropdownBtn && mobDropdownContent && mobDropdown) {
      mobDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const opened = mobDropdown.classList.toggle('open');
        mobDropdownBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
        mobDropdownContent.setAttribute('aria-hidden', opened ? 'false' : 'true');
      });
    }

    const obs = new IntersectionObserver(ents => {
      ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') });
    }, { threshold: .1 });
    document.querySelectorAll('.rev').forEach(r => obs.observe(r));

    // Media slideshow
    (function initSlideshow() {
      const slides = document.querySelectorAll('#mediaSlideshow .slide');
      if (!slides.length) return;
      let index = 0;
      const cycle = () => {
        slides.forEach((slide, i) => {
          const video = slide.querySelector('video');
          if (i === index) {
            slide.classList.add('active');
            if (video) video.play().catch(() => {});
          } else {
            slide.classList.remove('active');
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
        index = (index + 1) % slides.length;
      };
      cycle();
      setInterval(cycle, 7000);
    })();

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
      const cur = document.getElementById('cur');
      const ring = document.getElementById('ring');
      if (cur && ring) {
        cur.style.left = e.clientX + 'px';
        cur.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
      }
    });

    document.addEventListener('mouseenter', () => {
      const cur = document.getElementById('cur');
      const ring = document.getElementById('ring');
      if (cur && ring) {
        cur.style.display = 'block';
        ring.style.display = 'block';
      }
    });

    document.addEventListener('mouseleave', () => {
      const cur = document.getElementById('cur');
      const ring = document.getElementById('ring');
      if (cur && ring) {
        cur.style.display = 'none';
        ring.style.display = 'none';
      }
    });

    // Hover effect
    document.addEventListener('mouseover', (e) => {
      const cur = document.getElementById('cur');
      const ring = document.getElementById('ring');
      if (e.target.closest('a, button, [role="button"]')) {
        if (cur) cur.classList.add('h');
        if (ring) ring.classList.add('h');
      } else {
        if (cur) cur.classList.remove('h');
        if (ring) ring.classList.remove('h');
      }
    });