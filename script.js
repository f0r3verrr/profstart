(function () {
  'use strict';

  var header = document.getElementById('header');
  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelectorAll('.nav-list a');

  function openMenu() {
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    var isOpen = nav.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Плавное появление блоков при скролле
  var animated = document.querySelectorAll('.section-title, .section-lead, .about-card, .route-card, .contacts-block, .requisites-block, .partners-placeholder');
  var observerOptions = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  animated.forEach(function (el) {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // Запуск анимации для уже видимых при загрузке
  setTimeout(function () {
    animated.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.animationPlayState = 'running';
      }
    });
  }, 100);
})();
