(() => {
  'use strict';
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-toggle');
  const animationButton = document.querySelector('.animation-button');
  const animationImage = document.querySelector('.maduo-animation');
  let paused = prefersReduced.matches;
  function stopMaduo() {
    animationImage.src = 'assets/maduo-still.webp';
    animationButton.setAttribute('aria-pressed', 'false');
    animationButton.innerHTML = 'Play rupture animation <span aria-hidden="true">▷</span>';
  }
  function setMotion(value) {
    paused = value;
    root.dataset.motion = paused ? 'paused' : 'running';
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.innerHTML = paused ? 'Enable motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    if (paused) stopMaduo();
  }
  setMotion(paused);
  motionButton.addEventListener('click', () => setMotion(!paused));
  prefersReduced.addEventListener('change', e => setMotion(e.matches));
  animationButton.addEventListener('click', () => {
    if (animationButton.getAttribute('aria-pressed') === 'true') return stopMaduo();
    if (paused) setMotion(false);
    animationImage.src = 'images/Maduo_Sum.gif';
    animationButton.setAttribute('aria-pressed', 'true');
    animationButton.innerHTML = 'Pause rupture animation <span aria-hidden="true">Ⅱ</span>';
  });
  document.querySelector('#maduo').addEventListener('toggle', e => { if (!e.target.open) stopMaduo(); });
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  function closeMenu() {nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => {if (e.key === 'Escape') closeMenu();});
  document.addEventListener('click',e => { if (!e.target.closest('.site-header')) closeMenu(); });
  const filters = document.querySelectorAll('[data-year]');
  const publications = document.querySelectorAll('[data-pub-year]');
  filters.forEach(button => button.addEventListener('click',() => {
    let count=0;
    filters.forEach(b => {const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    publications.forEach(p => {p.hidden=button.dataset.year!=='all' && p.dataset.pubYear!==button.dataset.year;if(!p.hidden) count++;});
    document.querySelector('#publication-count').textContent=`${count} publication${count===1?'':'s'}`;
  }));
  const visualTabs=[...document.querySelectorAll('.visual-tabs [role=tab]')];
  function selectVisualTab(tab){visualTabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});}
  visualTabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectVisualTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%visualTabs.length;if(e.key==='ArrowLeft')next=(i+visualTabs.length-1)%visualTabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=visualTabs.length-1;if(next!==undefined){e.preventDefault();selectVisualTab(visualTabs[next]);visualTabs[next].focus();}});});
  const dialog=document.querySelector('#figure-dialog');
  let trigger;
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click',() => {
    trigger=button;
    const image=document.querySelector('#figure-image');
    image.src=button.dataset.image;
    image.alt=button.dataset.caption;
    document.querySelector('#figure-caption').textContent=button.dataset.caption;
    document.querySelector('#figure-original').href=button.dataset.image;
    dialog.showModal();document.body.style.overflow='hidden';
  }));
  dialog.querySelector('.dialog-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => {if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close();}});
  dialog.addEventListener('close',() => {document.body.style.overflow='';trigger?.focus({preventScroll:true});});
  let toastTimer;
  function toast(text){const element=document.querySelector('.toast');element.textContent=text;element.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>element.classList.remove('visible'),2600);}
  document.querySelectorAll('.copy-citation').forEach(button=>button.addEventListener('click',async()=>{
    const text=button.parentElement.querySelector('p').textContent;
    try{await navigator.clipboard.writeText(text);toast('Citation copied.');}catch{
      const range=document.createRange();range.selectNodeContents(button.parentElement.querySelector('p'));
      const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
      toast('Citation selected. Press Ctrl+C or ⌘C to copy.');
    }
  }));
  document.querySelector('#current-year').textContent=new Date().getFullYear();
  if ('IntersectionObserver' in window) {
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:0.06});
    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));root.classList.add('js');
    const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a[href^="#"]').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}),{rootMargin:'-20% 0px -65% 0px'});
    ['research','publications','about','updates'].forEach(id=>sectionObserver.observe(document.getElementById(id)));
  }
  const oldAnchors={'about-me':'about','-news':'updates','-publications':'publications','-research':'research','-honors-and-awards':'about','-educations':'about','-educations-and-appointments':'about','-invited-talks':'about'};
  if(oldAnchors[location.hash.slice(1)]){const id=oldAnchors[location.hash.slice(1)];history.replaceState(null,'',`#${id}`);document.getElementById(id).scrollIntoView();}
})();
