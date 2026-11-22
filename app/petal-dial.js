/* Eight physical slots scroll through the full graphics catalogue. */
(() => {
  const slots = 8;
  const stepAngle = 360 / slots;
  const wrap = (value, limit) => ((value % limit) + limit) % limit;

  window.SKMPetalDial = (host, {entries, onChange = () => {}, onOpen = () => {}, clockwise = false}) => {
    if (!entries.length) return;
    host.classList.add('petal-dial');
    host.replaceChildren();
    const rotor = document.createElement('div');
    rotor.className = 'petal-rotor';
    const hub = document.createElement('button');
    hub.type = 'button';
    hub.className = 'petal-hub';
    const preview = new Image();
    preview.alt = '';
    preview.draggable = false;
    hub.append(preview);
    host.append(rotor, hub);

    let step = 0;
    let angle = 0;
    let gesture = null;
    let dragged = false;
    const index = () => wrap(step, entries.length);
    const buttons = Array.from({length: slots}, (_, slot) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'petal-choice';
      const radians = slot * Math.PI * 2 / slots;
      button.style.left = (50 + 36 * Math.sin(radians)) + '%';
      button.style.top = (50 - 36 * Math.cos(radians)) + '%';
      const thumb = new Image();
      thumb.draggable = false;
      thumb.alt = '';
      button.append(thumb);
      rotor.append(button);
      button.onclick = event => {
        if (dragged && event.detail) return;
        const offset = Number(button.dataset.offset);
        if (offset) snap(step + (clockwise ? wrap(offset, entries.length) : offset));
        else if (!clockwise) onOpen(index());
      };
      return button;
    });

    function renderSelection() {
      buttons.forEach((button, slot) => {
        const offset = 4 - wrap(slot + step + 4, slots);
        const entry = entries[wrap(step + offset, entries.length)];
        if (button.firstChild.getAttribute('src') !== entry.src) button.firstChild.src = entry.src;
        button.dataset.offset = offset;
        button.setAttribute('aria-label', entry.label);
        button.setAttribute('aria-pressed', String(offset === 0));
      });
      const current = entries[index()];
      preview.src = current.src;
      hub.setAttribute('aria-label', current.label);
    }
    function commit(next) {
      if (next === step) return;
      step = next;
      renderSelection();
      if (window.SKMApp?.haptic) window.SKMApp.haptic('selection');
      else navigator.vibrate?.(8);
      onChange(index(), !!gesture);
    }
    function rotate(degrees) { host.style.setProperty('--turn', degrees + 'deg'); }
    function snap(next) { angle = next * stepAngle; commit(next); rotate(angle); }
    hub.onclick = event => {
      if (dragged && event.detail) return;
      if (clockwise) snap(step + 1);
      else onOpen(index());
    };
    host.onkeydown = event => {
      if (event.key === 'ArrowRight' || (!clockwise && event.key === 'ArrowLeft')) {
        event.preventDefault();
        snap(step + (event.key === 'ArrowRight' ? 1 : -1));
      }
    };
    const bearing = (e, box) => Math.atan2(e.clientY - box.top - box.height / 2,
      e.clientX - box.left - box.width / 2) * 180 / Math.PI;
    host.onpointerdown = e => {
      if (e.button !== 0 || gesture) return;
      const box = host.getBoundingClientRect();
      const target = e.target.closest('button') || host;
      gesture = {id: e.pointerId, x: e.clientX, y: e.clientY, last: bearing(e, box), box, target};
      dragged = false;
      target.setPointerCapture(e.pointerId);
      window.SKMApp?.haptic?.('prepareSelection');
    };
    host.onpointermove = e => {
      if (!gesture || gesture.id !== e.pointerId) return;
      if (!dragged && Math.hypot(e.clientX - gesture.x, e.clientY - gesture.y) < 7) return;
      dragged = true;
      host.classList.add('is-turning');
      const position = bearing(e, gesture.box);
      const change = wrap(position - gesture.last + 180, 360) - 180;
      gesture.last = position;
      if (clockwise && change < 0) return;
      angle += change;
      // A small dead band keeps grazing a notch from repeatedly firing haptics.
      if (Math.abs(angle - step * stepAngle) > stepAngle * .55) commit(Math.round(angle / stepAngle));
      rotate(step * stepAngle + (angle - step * stepAngle) * .55);
    };
    function release(e) {
      if (!gesture || gesture.id !== e.pointerId) return;
      const {target} = gesture;
      gesture = null;
      if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
      host.classList.remove('is-turning');
      snap(step);
    }
    host.onpointerup = host.onpointercancel = host.onlostpointercapture = release;
    renderSelection();
    return {select(i) {snap(step + wrap(i - index(), entries.length));}, next() {snap(step + 1);},
      get index() {return index();}};
  };
})();
