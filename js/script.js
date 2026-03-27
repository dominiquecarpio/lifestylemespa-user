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