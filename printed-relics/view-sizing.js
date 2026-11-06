/* Size only our same-origin model frames; no external message can resize a page. */
window.addEventListener('message', event => {
  if(event.origin !== location.origin || event.data?.type !== 'bbr-view-height') return;
  const height = Number(event.data.height);
  if(!Number.isFinite(height) || height < 300 || height > 1800) return;
  for(const frame of document.querySelectorAll('#product-model,.library-viewer')) {
    if(frame.contentWindow === event.source) frame.style.height = `${Math.ceil(height)}px`;
  }
});
