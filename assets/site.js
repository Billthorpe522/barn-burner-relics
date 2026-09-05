/* Shared keyboard behavior for the existing photo and inquiry dialogs. */
(() => {
  const focusable = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]';
  const dialogs = [...document.querySelectorAll('#photoOverlay,#flyerLightbox,#detailOverlay,#messengerOverlay')];
  const states = new Map();
  const isOpen = dialog => dialog.classList.contains('active') || dialog.classList.contains('open');
  const visibleControls = dialog => [...dialog.querySelectorAll(focusable)].filter(el => el.getClientRects().length);
  dialogs.forEach(dialog => {
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('tabindex', '-1');
    if (!dialog.hasAttribute('aria-labelledby') && !dialog.hasAttribute('aria-label')) {
      dialog.setAttribute('aria-label', dialog.id === 'messengerOverlay' ? 'Contact Barn Burner Relics' : 'Photo details');
    }
    states.set(dialog, { open: false, trigger: null });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab' || !isOpen(dialog)) return;
      const controls = visibleControls(dialog);
      if (!controls.length) { event.preventDefault(); dialog.focus(); return; }
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
        event.preventDefault(); first.focus();
      }
    });
  });
  const syncDialogs = () => {
    for (const dialog of dialogs) {
      const state = states.get(dialog), open = isOpen(dialog);
      if (open === state.open) continue;
      state.open = open;
      if (open) {
        state.trigger = document.activeElement;
        (visibleControls(dialog)[0] || dialog).focus();
      } else if (state.trigger && state.trigger.isConnected) {
        state.trigger.focus();
      }
    }
    document.body.style.overflow = dialogs.some(isOpen) ? 'hidden' : '';
  };
  const dialogObserver = new MutationObserver(syncDialogs);
  dialogs.forEach(dialog => dialogObserver.observe(dialog, { attributes: true, attributeFilter: ['class'] }));
  syncDialogs();
  const toggleButtons = [...document.querySelectorAll('.filter-btn,.sort-btn')];
  const syncButtons = () => toggleButtons.forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
  const buttonObserver = new MutationObserver(syncButtons);
  toggleButtons.forEach(button => buttonObserver.observe(button, { attributes: true, attributeFilter: ['class'] }));
  syncButtons();
})();
