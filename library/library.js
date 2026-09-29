(() => {
  'use strict';
  const controls = document.querySelector('.library-controls');
  const search = document.querySelector('#book-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const shelves = [...document.querySelectorAll('.shelf')];
  const status = document.querySelector('#result-count');
  const empty = document.querySelector('.empty-state');
  let selected = 'all';
  function update() {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let total = 0;
    for (const shelf of shelves) {
      let visible = 0;
      const matchesCategory = selected === 'all' || shelf.dataset.category === selected;
      for (const book of shelf.querySelectorAll('.book')) {
        const show = matchesCategory && terms.every(term => book.dataset.search.includes(term));
        book.hidden = !show;
        if (show) visible++;
      }
      shelf.hidden = visible === 0;
      shelf.querySelector('.shelf-count').textContent = `${String(visible).padStart(2, '0')} ${visible === 1 ? 'reference' : 'references'}`;
      total += visible;
    }
    status.textContent = `${total} ${total === 1 ? 'reference' : 'references'}`;
    empty.hidden = total !== 0;
    for (const button of filters) {
      const active = button.dataset.filter === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  }
  search.addEventListener('input', update);
  filters.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.filter;
    update();
  }));
  document.querySelector('#reset-search').addEventListener('click', () => {
    search.value = '';
    selected = 'all';
    update();
    search.focus();
  });
  controls.hidden = false;
})();
