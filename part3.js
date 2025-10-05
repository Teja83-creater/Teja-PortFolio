/* script.js
   - typed tagline animation
   - reveal on scroll (IntersectionObserver)
   - small demo "send" for contact
*/

document.addEventListener('DOMContentLoaded', () => {
  // Typed tagline
  const phrases = [
    "Next-Gen Tech Explorer",
    "Java Full-Stack & AI/ML",
    "Hackathon Enthusiast",
    "Building tools for a better future"
  ];
  let pIndex = 0, cIndex = 0;
  const typedEl = document.getElementById('typed');
  const cursor = document.querySelector('.cursor');

  function type() {
    const text = phrases[pIndex];
    if (cIndex <= text.length) {
      typedEl.textContent = text.slice(0, cIndex);
      cIndex++;
      setTimeout(type, 80);
    } else {
      setTimeout(erase, 900);
    }
  }
  function erase() {
    const text = phrases[pIndex];
    if (cIndex > 0) {
      typedEl.textContent = text.slice(0, cIndex-1);
      cIndex--;
      setTimeout(erase, 30);
    } else {
      pIndex = (pIndex + 1) % phrases.length;
      setTimeout(type, 250);
    }
  }
  type();

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if (href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Contact demo
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      sendBtn.textContent = 'Sent ✓';
      sendBtn.disabled = true;
      setTimeout(()=>{ sendBtn.textContent = 'Send (demo)'; sendBtn.disabled = false; }, 1800);
      alert('This contact form is a demo. You can integrate an email API or backend later.');
    });
  }

  // small perf: animate skill bars when visible
  const skillObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(b => {
          // width already set inline in HTML, but re-assign to trigger CSS transition
          const w = b.style.width;
          b.style.width = '0%';
          setTimeout(()=> b.style.width = w, 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.2});
  document.querySelectorAll('#skills').forEach(s => skillObserver.observe(s));
});
