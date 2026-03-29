    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('s', window.scrollY > 70));


    document.getElementById('ham').addEventListener('click', () => document.getElementById('mob').classList.toggle('open'));
    function cm() { document.getElementById('mob').classList.remove('open') }


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