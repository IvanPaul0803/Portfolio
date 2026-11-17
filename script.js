const target = document.getElementById('typewriter');
const cursor = document.querySelector('.cursor');

const phrases = [
  { prefix: 'Building ', highlight: 'elegant' },
  { prefix: 'Digital ',  highlight: 'systems' }
];

let phraseIndex = 0;
let charCount = 0;
let isDeleting = false;

function tick() {
  const current = phrases[phraseIndex];
  const fullText = current.prefix + current.highlight;
  const prefixLen = current.prefix.length;

  if (isDeleting) {
    charCount--;
  } else {
    charCount++;
  }

  // Render current sliced state
  let html = '';
  if (charCount <= prefixLen) {
    html = current.prefix.slice(0, charCount);
  } else {
    const highlightPart = current.highlight.slice(0, charCount - prefixLen);
    html = current.prefix + `<em style="color:var(--gold)">${highlightPart}</em>`;
  }
  target.innerHTML = html;

  let speed = isDeleting ? 38 : 70;

  // Finished typing full phrase: pause then delete
  if (!isDeleting && charCount === fullText.length) {
    speed = 2200; // Pause so visitors can read the completed phrase
    isDeleting = true;
  } else if (isDeleting && charCount === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400; // Brief pause before typing next phrase on the same spot
  }

  setTimeout(tick, speed);
}
setTimeout(tick, 600);

// --- Scroll Fade-in Animations ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
  '#about .section-label, #about h2, .about-text, .highlight-item, ' +
  '#skills .section-label, #skills h2, .skill-card, ' +
  '#projects .section-label, #projects h2, .project-card, ' +
  '#contact .contact-inner'
);

elementsToAnimate.forEach((el, index) => {
  el.classList.add('fade-up');
  
  // Stagger effect for items in grids
  if (el.classList.contains('highlight-item') || el.classList.contains('skill-card')) {
    const delay = (index % 4) * 100;
    el.style.transitionDelay = `${delay}ms`;
  }
  
  observer.observe(el);
});