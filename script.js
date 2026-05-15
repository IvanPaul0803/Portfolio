const target = document.getElementById('typewriter');
const cursor = document.querySelector('.cursor');

const parts = [
  { text: 'Building ',        gold: false },
  { text: 'elegant',          gold: true  },
  { text: '\ndigital systems', gold: false },
];

let partIndex = 0;
let charIndex = 0;
// Endless typing: wait 3 seconds after finishing, then restart
function type() {
  if (partIndex >= parts.length) {
    setTimeout(() => {
      partIndex = 0;
      charIndex = 0;
      target.innerHTML = '';
      type();
    }, 3000);
    return;
  }
//current part we are typing and slice current position of letter//
  const current = parts[partIndex];
  const slice = current.text.slice(0, charIndex + 1);
//Creating a loop for each letter in html//
  let html = '';
  for (let i = 0; i < partIndex; i++) {
    const p = parts[i];
    const t = p.text.replace('\n', '<br>');
    html += p.gold ? `<em style="color:var(--gold)">${t}</em>` : t;
  }
  const currentText = slice.replace('\n', '<br>');
  html += current.gold
    ? `<em style="color:var(--gold)">${currentText}</em>`
    : currentText;

  target.innerHTML = html;

  charIndex++;
  if (charIndex >= current.text.length) {
    partIndex++;
    charIndex = 0;
    setTimeout(type, 180);
  } else {
    setTimeout(type, 55);
  }
}
setTimeout(type, 600);

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