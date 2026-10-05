(() => {
  const links = [...document.querySelectorAll('.doc-link')];
  const input = document.getElementById('menu-search');
  const counter = document.getElementById('menu-count');
  const empty = document.getElementById('empty-state');
  const frame = document.getElementById('document-frame');
  const title = document.getElementById('current-title');
  const version = document.getElementById('current-version');
  const open = document.getElementById('open-document');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const select = link => {
    links.forEach(item => { item.classList.remove('active'); item.removeAttribute('aria-current'); });
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
    title.textContent = link.dataset.title;
    version.textContent = link.dataset.version;
    frame.title = link.dataset.title;
    open.href = link.href;
    document.title = link.dataset.title + ' · Biblioteca PPGCC';
  };
  links.forEach(link => link.addEventListener('click', () => select(link)));
  input.addEventListener('input', () => {
    const query = normalize(input.value.trim());
    let shown = 0;
    document.querySelectorAll('.menu-section').forEach(section => {
      let sectionShown = 0;
      section.querySelectorAll('.doc-link').forEach(link => {
        const match = normalize(link.dataset.search).includes(query);
        link.hidden = !match;
        if (match) { shown++; sectionShown++; }
      });
      section.hidden = sectionShown === 0;
    });
    empty.style.display = shown ? 'none' : 'block';
    counter.textContent = query ? `${shown} de ${links.length} documentos` : `${links.length} documentos`;
  });
  counter.textContent = `${links.length} documentos`;
})();